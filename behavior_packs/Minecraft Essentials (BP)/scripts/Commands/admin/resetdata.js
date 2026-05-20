import Sell from "../../Modules/Data/Sell"
import Shop from "../../Modules/Data/Shop"
import FloatingText from "../../Modules/FloatingText"
import { ResetData } from "../../Modules/Forms"
import Ranks from "../../Modules/Ranks"

const DataList = {
  "ALL DATA": "all",
  "MONEY DATA": "money",
  "HOME DATA": "home",
  "WARP DATA": "warp",
  "BAN DATA": "ban",
  "SETTING DATA": "setting",
  "SHOP DATA": "shop",
  "SELL DATA": "sell",
  "RANK DATA": "rank",
  "FLOATINGTEXT DATA": "floatingtext"
}

const resetdata = (Server) => {
  Server.Commands.register({
    name: "resetdata",
    description: "mce.command.resetdata.description",
    usage: "resetdata",
    permission: "resetdata",
    category: "Admin"
  }, async (data, player, args) => {
    player.sendMessage({ translate: "mce.ui.closechat" })
    let selectedData = await ResetData.selectData(player, Object.keys(DataList))
    if (selectedData == undefined) return player.sendMessage({ translate: "mce.command.resetdata.canceled" })
    let confirmReset = await ResetData.confirmReset(player, selectedData)
    if (!confirmReset) return player.sendMessage({ translate: "mce.command.resetdata.canceled" })

    try {
      switch (DataList[selectedData]) {
        case "all":
          Server.Money.resetData()
          Server.HomeDB.clear()
          Server.WarpDB.clear()
          Server.BanDB.clear()
          Server.Setting.resetAll()
          Shop.resetData()
          Sell.resetData()
          Ranks.resetRanks()
          FloatingText.clear()
          break

        case "money":
          Server.Money.resetData()
          break

        case "home":
          Server.HomeDB.clear()
          break

        case "warp":
          Server.WarpDB.clear()
          break

        case "ban":
          Server.BanDB.clear()
          break

        case "setting":
          Server.Setting.resetAll()
          break

        case "shop":
          Shop.resetData()
          break

        case "sell":
          Sell.resetData()
          break

        case "rank":
          Ranks.resetRanks()
          break

        case "floatingtext":
          FloatingText.clear()
          break

        default:
          return player.sendMessage({ translate: "mce.command.resetdata.unknown" })
      }
    } catch (err) {
      return player.sendMessage(`§c[Error] ${err}, send this error to discord!`)
    }
    player.sendMessage({ translate: "mce.command.resetdata.successfully" })
  })
}

export default resetdata