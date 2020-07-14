import { baseLayout } from './setting'
import { getFreeSpace } from './utils'

// dp 节点
interface DpNode {
    // 以坐标 [i][j]（i 为纵坐标，j 为横坐标，下同）为右下角时所能生成的最大正方形的边长
    len: number
    // 以坐标 [i][j] 为右下角，[0][0] 为左上角的矩形区域内的沼泽数量之和
    swamp: number
}

// 房间的边长
const ROOM_MAX_SIZE = 50

/**
 * 在房间中找到所有可以放下基地的点
 * 会尽可能的挑选沼泽数量少的区域
 * 
 * @param room 运行规划的房间
 * @param baseSize 正方形基地的尺寸
 * @returns 所有满足条件的房间位置
 */
export const findBaseCenterPos = function(room: Room, baseSize: number = 11): RoomPosition[] {
    const terrain = new Room.Terrain(room.name)

    let dp: DpNode[][] = Array().fill(ROOM_MAX_SIZE).map(_ => [])
    // 合适的结果集
    let result: RoomPosition[] = []
    // 结果集里对应的沼泽数量
    let minSwamp = Infinity

    // 遍历所有地块
    for (let i = 0; i < ROOM_MAX_SIZE; i ++) {
        for (let j = 0; j < ROOM_MAX_SIZE; j ++) {
            const { topLeft, top, left } = getOtherArea(dp, i, j, 1)

            // 生成当前位置的状态
            dp[i][j] = {
                // 以当前位置为右下角，可以生成的最大正方形的边长
                len: terrain.get(j, i) === TERRAIN_MASK_WALL ? 0 : (Math.min(topLeft.len, top.len, left.len) + 1),
                // 以当前位置为右下角，[0][0] 为左上角的区域内所有的沼泽数量
                swamp: top.swamp + left.swamp - topLeft.swamp + (terrain.get(j, i) === TERRAIN_MASK_SWAMP ? 1 : 0)
            }

            // 发现该正方形已经可以满足要求了
            if (dp[i][j].len >= baseSize) {
                // 获取正方形右上侧的三个区域
                const { topLeft, top, left } = getOtherArea(dp, i, j, baseSize)
                // 计算出当前区域内的沼泽数量
                const currentSwamp = dp[i][j].swamp - top.swamp - left.swamp + topLeft.swamp

                // 沼泽数量不是最小的
                if (currentSwamp > minSwamp) continue

                const pos = getCenterBybottomRight(i, j, baseSize)
                const centerPos = new RoomPosition(pos[1], pos[0], room.name)

                // 对比沼泽数量并更新结果
                if (currentSwamp < minSwamp) {
                    minSwamp = currentSwamp
                    result = [ centerPos ]
                }
                else if (currentSwamp === minSwamp) result.push(centerPos)
            }
        }
    }

    return result
}

/**
 * 获取状态转移所需的三个相邻节点
 * 
 * @param dp 状态集
 * @param i 目标正方形右下角的 y 坐标
 * @param j 目标正方形右下角的 x 坐标
 * @param len 正方形的边长
 */
const getOtherArea = function(dp: DpNode[][], i: number, j: number, len: number): { topLeft: DpNode, top: DpNode, left: DpNode } {
    // 越界时的默认值
    const nullNode: DpNode = { len: 0, swamp: 0 }
    // 检查索引是否小于零，小于零就返回默认值
    return {
        topLeft: (i - len > -1 && j - len > -1) ? dp[i - len][j - len] : nullNode,
        top: (i - len > -1) ? dp[i - len][j] : nullNode,
        left: (j - len > -1) ? dp[i][j - len] : nullNode,
    }
}

/**
 * 获取该正方形中心点的坐标
 * 
 * @param i 正方形右下角的 y 坐标
 * @param j  正方形右下角的 x 坐标
 * @param len 正方形的边长
 * @returns [0] 为中央点 x 坐标，[1] 为 y 坐标
 */
const getCenterBybottomRight = function(i: number, j: number, len: number): [ number, number ] {
    return [
        i - (len / 2) + 0.5,
        j - (len / 2) + 0.5,
    ]
}

/**
 * 确定唯一的基地中心点
 * 
 * @param room 运行规划的房间
 * @param targetPos 待选的中心点数组
 * @returns 基地中心点
 */
export const confirmBasePos = function(room: Room, targetPos: RoomPosition[]): RoomPosition {
    if (!targetPos || targetPos.length <= 0) return undefined

    const controller = room.controller
    const mineral = room.mineral
    if (!controller || !mineral) return undefined

    // 所有待选点到 controller 和 mineral 的距离总和
    const totalDistances = targetPos.map((pos, index) => ({
        distance: pos.findPathTo(controller).length + pos.findPathTo(mineral).length,
        index
    }))

    // 找到最小值并返回对应的位置
    const target = _.min(totalDistances, item => item.distance)
    return targetPos[target.index]
}

/**
 * 给指定房间设置中心点
 * 
 * @param room 要设置中心点的房间
 * @param centerPos 中心点坐标
 */
export const setBaseCenter = function(room: Room, centerPos: RoomPosition): OK | ERR_INVALID_ARGS {
    if (!centerPos) return ERR_INVALID_ARGS

    room.memory.center = [ centerPos.x, centerPos.y ]
    return OK
}

/**
 * 获取基地的布局信息
 * 每个建筑到基准点的相对位置和建筑类型
 * 
 * @param centerFlagName 基准点（中心点）旗帜名称
 * @param baseSize 基地尺寸，将忽略该尺寸以外的建筑
 */
export const getBaseLayout = function(centerFlagName: string, baseSize: number = 11): string {
    const flag = Game.flags[centerFlagName]
    if (!flag) return `未找到基准点旗帜`

    // 获取范围内的建筑
    const inRangeStructure = flag.pos.findInRange(FIND_STRUCTURES, (baseSize / 2 - 0.5))

    let layout = {}
    // 遍历所有范围内建筑，统计相对位置
    inRangeStructure.forEach(s => {
        if (!layout[s.structureType]) layout[s.structureType] = []
        layout[s.structureType].push([ flag.pos.x - s.pos.x, flag.pos.y - s.pos.y ])
    })

    return JSON.stringify(layout, null, 4)
}

/**
 * 对指定房间运行自定建筑摆放
 * 会自动放置建筑工地并发布建造者
 * 
 * @param room 要运行规划的房间
 */
export const planLayout = function(room: Room): OK | ERR_NOT_OWNER | ERR_NOT_FOUND {
    if (!room.controller || !room.controller.my) return ERR_NOT_OWNER

    // 当前需要检查那几个等级的布局
    const planLevel = Array(room.controller.level).fill(undefined).map((_, index) => index + 1)
    // 房间保存的中心位置
    const center = room.memory.center
    if (!center) return ERR_NOT_FOUND

    let needBuild = false
    // 从 1 级开始检查
    planLevel.forEach((level: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8) => {
        // 当前等级的布局
        const currentLevelLayout = baseLayout[level]

        // 遍历布局中所有建筑，检查是否又可建造的
        Object.keys(currentLevelLayout).forEach((structureType: BuildableStructureConstant) => {
            currentLevelLayout[structureType].forEach(pos => {
                // 为 null 说明在集中布局之外
                if (pos == null) return placeOutsideConstructionSite(room, structureType)

                // 直接发布工地，通过返回值检查是否需要建造
                const result = room.createConstructionSite(center[0] + pos[0], center[1] + pos[1], structureType)

                // 存在需要建造的建筑
                if (result === OK) needBuild = true
            })
        })
    })

    // 有需要建造的，发布建造者
    if (needBuild) room.addBuilder()

    return OK
}

/**
 * 放置集中布局之外的建筑
 * Link、Extractor 之类的
 * 
 * @param room 要放置工地的房间
 * @param type 要放置的建筑类型
 */
const placeOutsideConstructionSite = function(room: Room, type: StructureConstant): void {
    if (type === STRUCTURE_LINK) {
        // 给 source 旁边造 link
        for (const source of room.sources) {
            // 旁边已经造好了 link，就检查下一个 source
            if (source.pos.findInRange(FIND_MY_STRUCTURES, 2, {
                filter: s => s.structureType === STRUCTURE_LINK
            })) continue

            // 获取 source 旁边的开采单位位置
            const harvesterPos = getFreeSpace(source.pos, true)[0]
            if (!harvesterPos) continue
            // 以开采单位为基础寻找 link 的位置
            const targetPos = getFreeSpace(harvesterPos, true)[0]
            if (!targetPos) continue

            // 建造 link
            targetPos.createConstructionSite(STRUCTURE_LINK)
            // 一次只会建造一个 link
            break
        }
    }
    // 是 EXTRACTOR 就直接点下去
    else if (type === STRUCTURE_EXTRACTOR) {
        room.mineral.pos.createConstructionSite(STRUCTURE_EXTRACTOR)
    }
}