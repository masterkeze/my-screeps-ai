import { colorful } from './utils'

/**
 * 设置项
 * 本文件和 config.ts 的区别在于，本文件中的内容一般情况下不需要进行修改。
 * 本文件存放了项目中的内置常量
 */

/**
 * 不同角色类型的身体部件
 * spawn 在孵化时会根据所处房间的等级自动调整身体部件
 */
export const bodyConfigs: IBodyConfigs = {
    /**
     * 工作单位
     * 诸如 harvester、builder、upgrader 之类的
     */
    worker: {
        1: [ WORK, CARRY, MOVE ],
        2: [ WORK, CARRY, MOVE, WORK, CARRY, MOVE ],
        3: [ WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE ],
        4: [ WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE ],
        5: [ WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE ],
        6: [ WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE],
        7: [ WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE ],
        8: [ WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE ]
    },

    /**
     * 纯粹的工作单位
     * 只包含 WORK 和少量的 MOVE
     */
    pureWork: {
        1: [ WORK, WORK, MOVE ],
        2: [ WORK, WORK, MOVE, WORK, MOVE ],
        3: [ WORK, WORK, MOVE, WORK, WORK, MOVE ],
        4: [ WORK, WORK, MOVE, WORK, WORK, MOVE, WORK, MOVE ],
        5: [ WORK, WORK, MOVE, WORK, WORK, MOVE, WORK, WORK, MOVE ],
        6: [ WORK, WORK, MOVE, WORK, WORK, MOVE, WORK, WORK, MOVE, WORK, MOVE ],
        7: [ WORK, WORK, MOVE, WORK, WORK, MOVE, WORK, WORK, MOVE, WORK, WORK, MOVE ],
        8: [ WORK, WORK, MOVE, WORK, WORK, MOVE, WORK, WORK, MOVE, WORK, WORK, MOVE, WORK, WORK, MOVE ]
    },
    
    /**
     * 小型 worker
     */
    smallWorker: {
        1: [ WORK, CARRY, MOVE ],
        2: [ WORK, CARRY, MOVE ],
        3: [ WORK, CARRY, MOVE, WORK, CARRY, MOVE ],
        4: [ WORK, CARRY, MOVE, WORK, CARRY, MOVE ],
        5: [ WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE ],
        6: [ WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE ],
        7: [ WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE ],
        8: [ WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE ]
    },

    /**
     * 转移单位
     * 负责转移基地资源的 creep
     */
    transfer: {
        1: [ CARRY, CARRY, MOVE ],
        2: [ CARRY, CARRY, MOVE, CARRY, MOVE ],
        3: [ CARRY, CARRY, MOVE, CARRY, CARRY, MOVE ],
        4: [ CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, MOVE ],
        5: [ CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE ],
        6: [ CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE ],
        7: [ CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE ],
        8: [ CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE ]
    },

    /**
     * 声明单位
     * 包含 CLAIM 的 creep
     */
    claimer: {
        1: [ MOVE, CLAIM ],
        2: [ MOVE, CLAIM ],
        3: [ MOVE, CLAIM ],
        4: [ MOVE, CLAIM ],
        5: [ MOVE, CLAIM, MOVE, CLAIM ],
        6: [ MOVE, CLAIM, MOVE, CLAIM ],
        7: [ MOVE, CLAIM, MOVE, CLAIM ],
        8: [ MOVE, CLAIM, MOVE, CLAIM ],
    },

    /**
     * 基础攻击单位
     * 使用 attack 身体部件的攻击单位
     */
    attacker: {
        1: [ MOVE, MOVE, ATTACK, ATTACK ],
        2: [ MOVE, MOVE, MOVE, ATTACK, ATTACK, ATTACK ],
        3: [ MOVE, MOVE, MOVE, MOVE, ATTACK, ATTACK, ATTACK, ATTACK ],
        4: [ MOVE, MOVE, MOVE, MOVE, MOVE, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK ],
        5: [ MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK ],
        6: [ MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK ],
        7: [ MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK ],
        8: [ MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK ]
    },
    
    /**
     * 治疗单位
     */
    healer: {
        1: [ MOVE, MOVE, HEAL, HEAL ],
        2: [ MOVE, MOVE, MOVE, HEAL, HEAL, HEAL ],
        3: [ MOVE, MOVE, MOVE, MOVE, HEAL, HEAL, HEAL, HEAL ],
        4: [ MOVE, MOVE, MOVE, MOVE, MOVE, HEAL, HEAL, HEAL, HEAL, HEAL ],
        5: [ MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL ],
        6: [ MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL ],
        7: [ MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL ],
        8: [ MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL ]
    },

    /**
     * 外矿防御单位
     */
    remoteDefender: {
        1: [ TOUGH, MOVE, ATTACK, MOVE ],
        2: [ TOUGH, MOVE, RANGED_ATTACK, MOVE, RANGED_ATTACK, MOVE ],
        3: [ TOUGH, MOVE, RANGED_ATTACK, MOVE, RANGED_ATTACK, MOVE, HEAL, MOVE ],
        4: [ TOUGH, TOUGH, MOVE, MOVE, RANGED_ATTACK, MOVE, RANGED_ATTACK, MOVE, RANGED_ATTACK, MOVE, HEAL, MOVE ],
        5: [ TOUGH, TOUGH, TOUGH, MOVE, MOVE, MOVE, RANGED_ATTACK, MOVE, RANGED_ATTACK, MOVE, RANGED_ATTACK, MOVE, RANGED_ATTACK, MOVE, HEAL, MOVE ],
        6: [ TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, MOVE, MOVE, MOVE, MOVE, MOVE, RANGED_ATTACK, MOVE, RANGED_ATTACK, MOVE, RANGED_ATTACK, MOVE, RANGED_ATTACK, MOVE, RANGED_ATTACK, MOVE, HEAL, MOVE ],
        7: [ TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, MOVE, MOVE, MOVE, MOVE, MOVE, RANGED_ATTACK, MOVE, RANGED_ATTACK, MOVE, RANGED_ATTACK, MOVE, RANGED_ATTACK, MOVE, RANGED_ATTACK, MOVE, HEAL, MOVE, HEAL, MOVE ],
        8: [ TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, MOVE, MOVE, MOVE, MOVE, MOVE, RANGED_ATTACK, MOVE, RANGED_ATTACK, MOVE, RANGED_ATTACK, MOVE, RANGED_ATTACK, MOVE, RANGED_ATTACK, MOVE, HEAL, MOVE, HEAL, MOVE ],
    },

    /**
     * 拆除者身体
     */
    dismantler: {
        1: [ TOUGH, MOVE, WORK, MOVE ],
        2: [ TOUGH, MOVE, TOUGH, MOVE, WORK, MOVE, WORK, MOVE ],
        3: [ TOUGH, MOVE, TOUGH, MOVE, WORK, MOVE, WORK, MOVE, WORK, MOVE ],
        4: [ TOUGH, MOVE, TOUGH, MOVE, TOUGH, MOVE, WORK, MOVE, WORK, MOVE, WORK, MOVE, WORK, MOVE ],
        5: [ TOUGH, MOVE, TOUGH, MOVE, TOUGH, MOVE, TOUGH, MOVE, WORK, MOVE, WORK, MOVE, WORK, MOVE, WORK, MOVE, WORK, MOVE ],
        6: [ TOUGH, MOVE, TOUGH, MOVE, TOUGH, MOVE, TOUGH, MOVE, TOUGH, MOVE, WORK, MOVE, WORK, MOVE, WORK, MOVE, WORK, MOVE, WORK, MOVE, WORK, MOVE ],
        7: [ TOUGH, MOVE, TOUGH, MOVE, TOUGH, MOVE, TOUGH, MOVE, TOUGH, MOVE, TOUGH, MOVE, TOUGH, MOVE, TOUGH, MOVE, TOUGH, MOVE, TOUGH, MOVE, TOUGH, MOVE, TOUGH, MOVE, WORK, MOVE, WORK, MOVE, WORK, MOVE, WORK, MOVE, WORK, MOVE, WORK, MOVE, WORK, MOVE ],
        8: [ TOUGH, MOVE, TOUGH, MOVE, TOUGH, MOVE, TOUGH, MOVE, TOUGH, MOVE, TOUGH, MOVE, TOUGH, MOVE, TOUGH, MOVE, TOUGH, MOVE, TOUGH, MOVE, TOUGH, MOVE, TOUGH, MOVE, TOUGH, MOVE, WORK, MOVE, WORK, MOVE, WORK, MOVE, WORK, MOVE, WORK, MOVE, WORK, MOVE, WORK, MOVE ],
    },

    /**
     * 外矿采集者
     * 和采集者的区别就是外矿采集者拥有更多的 CARRY
     */
    remoteHarvester: {
        1: [ WORK, CARRY, MOVE ],
        2: [ WORK, CARRY, MOVE, WORK, CARRY, MOVE ],
        3: [ WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE ],
        4: [ WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, CARRY, CARRY, MOVE ],
        5: [ WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE ],
        6: [ WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE ],
        7: [ WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE ],
        8: [ WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE ]
    }
}


// creep 的默认内存
export const creepDefaultMemory: CreepMemory = {
    role: '',
    ready: false,
    working: false,
    path: []
}

function createConst(name: string, constant: string): string {
    return `${colorful(name, '#6b9955')} ${colorful(constant, '#8dc5e3')}`
}

export const resourcesHelp: string = `
${createConst('O', 'RESOURCE_OXYGEN')} ${createConst('H', 'RESOURCE_HYDROGEN')} ${createConst('U', 'RESOURCE_UTRIUM')} ${createConst('X', 'RESOURCE_CATALYST')}
${createConst('压缩O', 'RESOURCE_OXIDANT')} ${createConst('压缩H', 'RESOURCE_REDUCTANT')} ${createConst('压缩U', 'RESOURCE_UTRIUM_BAR')} ${createConst('压缩X', 'RESOURCE_PURIFIER')}
${createConst('L', 'RESOURCE_LEMERGIUM')} ${createConst('K', 'RESOURCE_KEANIUM')} ${createConst('Z', 'RESOURCE_ZYNTHIUM')} ${createConst('G', 'RESOURCE_GHODIUM')} 
${createConst('压缩L', 'RESOURCE_LEMERGIUM_BAR')} ${createConst('压缩K', 'RESOURCE_KEANIUM_BAR')} ${createConst('压缩Z', 'RESOURCE_ZYNTHIUM_BAR')} ${createConst('压缩G', 'RESOURCE_GHODIUM_MELT')}

${createConst('TOUGH强化', 'RESOURCE_CATALYZED_GHODIUM_ALKALIDE')} ${createConst('RANGE_ATTACK强化', 'RESOURCE_CATALYZED_KEANIUM_ALKALIDE')}
${createConst('MOVE强化', 'RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE')} ${createConst('HEAL强化', 'RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE')}
`

// 房间建筑维修需要的设置
export const repairSetting = {
    // 普通建筑维修的检查间隔
    checkInterval: 10,
    // 墙壁维修的检查间隔
    wallCheckInterval: 5,
    // 墙壁的关注时间
    focusTime: 100
}