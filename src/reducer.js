export const INFOSReducer = (INFOS, action) => {
  switch (action.type) {
    case "add_new":
      console.log("dispatch -> into new");
      return [
        ...INFOS,
        {
          id: INFOS.length + 1,
          period: action.payload.currQuestion.period,
          infos: [
            {
              infoId: action.payload.singleInfo.id,
              infoName: action.payload.singleInfo.name,
              infoText: action.payload.singleInfo.text,
              isActive: false,
            },
          ],
          isShowEntries: true,
        },
      ];

    case "add_existing":
      console.log("dispatch -> into existing");
      const newINFO = {
        infoId: action.payload.singleInfo.id,
        infoName: action.payload.singleInfo.name,
        infoText: action.payload.singleInfo.text,
        isActive: false,
      };
      var INFOSClone = INFOS;
      var infosArray = INFOS[action.payload.i].infos;
      infosArray.push(newINFO);
      const newObj = { ...INFOS[action.payload.i], infos: infosArray };
      INFOSClone[action.payload.i] = newObj;
      return INFOSClone;

    case "choose_active_info":
      console.log("dispatch -> into choose active info");

      const arrayInfos = [...action.payload.INFO.infos];
      arrayInfos[action.payload.i] = {
        ...arrayInfos[action.payload.i],
        isActive: true,
      };
      action.payload.setCurrentInfoDisplayed(arrayInfos[action.payload.i]);
      action.payload.setIsShowInfo(true);
      const INFOArrCLone = [...INFOS];
      INFOArrCLone[action.payload.INFOindex] = {
        ...INFOArrCLone[action.payload.INFOindex],
        infos: arrayInfos,
      };
      // setINFOS(INFOArrCLone);      do with dispatch!
      console.log("info is active?", action.payload.info.isActive);

      return INFOArrCLone;

    case "choose_active_period":
      //   const j = INFOS.findIndex((period) => period.id === action.periodId);
      console.log("dispatch -> into choose active period");
      const newArray = [...INFOS];
      const cloneObj = INFOS[action.payload.i];
      const show = cloneObj.isShowEntries;
      const newObject = { ...cloneObj, isShowEntries: !show };
      newArray[action.payload.i] = newObject;
      return newArray;

    default:
      console.log("dispatch -> into default");
      return INFOS;
  }
};
