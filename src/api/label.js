const ALARM_CAUSE = [

    { id: 1, name: "声爆" },
    { id: 2, name: "烟火" },
    { id: 3, name: "异物入侵" },
    { id: 4, name: "飞鸟入侵" },
    { id: 5, name: "树木生长" },
    { id: 6, name: "异常放电" },
    { id: 7, name: "雷电侦测" },
    { id: 8, name: "大型车辆" },
    { id: 9, name: "杆塔倾斜" },
    { id: 10, name: "人员入侵" },
    { id: 11, name: "鸟巢" }
]

const ALARM_LEVEL = [
    { id: 1, name: "紧急" },
    { id: 2, name: "非紧急" }
]

const DEVICE_POSITION = [
    { id: 1, name: "大号侧" },
    { id: 2, name: "小号侧" },
    { id: 3, name: "左侧" },
    { id: 4, name: "右侧" },
]

const VOLTAGE_LEVEL = [
    { id: 1, name: "35kV" },
    { id: 2, name: "220kV" },
    { id: 3, name: "500kV" },
    { id: 4, name: "±6660kV" },
    { id: 5, name: "±800kV" },
    { id: 6, name: "1000kV" }
]

const SIM_PROVIDER = [
    { id: 1, name: "联通" }, {
        id: 2, name: "电信"
    },
    { id: 3, name: "移动" }
]

const ALARM_HAS_READ = [
    { id: 1, name: "已读" },
    { id: 0, name: "未读" }
]

const ALARM_TYPE = [
    { id: 1, name: "预警" },
    { id: 2, name: "告警" },
    { id: 3, name: "误报" },
    { id: 4, name: "非告警" }
]

const STATUS = [
    { id: 0, name: "无效" },
    { id: 1, name: "有效" }
]

const DEVICE_TYPE = [
    { id: 1, name: "A" },
    { id: 2, name: "B" },
    { id: 3, name: "C" },
    { id: 4, name: "D" },
    { id: 5, name: "E" },
    { id: 6, name: "F" },
    { id: 7, name: "G" },
    { id: 8, name: "H" }
]

const DEVICE_OPERATING_STATUS = [
    { id: 1, name: "在运" },
    // { id: 2, name: "检修分析中" },
    // { id: 3, name: "检修维护中" },
    { id: 0, name: "停运" }
]

const DEVICE_ONLINE_STATUS = [
    { id: 1, name: "离线" },
    { id: 2, name: "在线" },
    { id: 3, name: "异常" }
]

const DEVICE_CATEGORY = [
    { id: 1, name: "拍照装置" },
]

const REPAIR_BILL_CAUSE = [
    { id: 1, name: "设备未上图" },
    { id: 2, name: "图像不合格" },
    { id: 3, name: "位置不合适" },
    { id: 4, name: "位置偏移" },
    { id: 5, name: "其他" },

]

const REPAIR_BILL_DESC = [
    { id: 1, name: "全部更换" },
    { id: 1, name: "设备更换" },
    { id: 1, name: "SIM更换" },
    { id: 1, name: "设备维修" },
]

const TOWER_NATURE = [
    { id: 1, name: "耐张" },
    { id: 2, name: "直线" }
]

const TOWER_CATEGORY = [
    { id: 1, name: "钢管塔" },
    { id: 2, name: "角钢塔" },
]

const Device_Snap_Setting = [
    { id: 1, name: "5分钟" },
    { id: 2, name: "15分钟" },
    { id: 3, name: "30分钟" },
]

export default {
    ALARM_CAUSE,//告警原因
    ALARM_LEVEL,//告警等级
    DEVICE_POSITION,//安装位置
    VOLTAGE_LEVEL,//电压等级
    SIM_PROVIDER,//SIM卡运营商
    ALARM_HAS_READ,//告警是否已读
    ALARM_TYPE,//告警类型
    STATUS,//状态
    DEVICE_TYPE,//设备类型
    DEVICE_OPERATING_STATUS,//运行状态
    DEVICE_ONLINE_STATUS,//在运状态
    DEVICE_CATEGORY,//设备分类
    REPAIR_BILL_CAUSE,//维修单原因
    REPAIR_BILL_DESC,//维修单描述
    TOWER_NATURE,//杆塔性质
    TOWER_CATEGORY,//杆塔类型
    Device_Snap_Setting,//拍摄时间设置


}