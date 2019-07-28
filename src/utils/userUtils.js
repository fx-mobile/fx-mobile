/**
 * 
 * @param {*} users  sessionStorageUtil.getItem(sessionStorageUtil.USER_LOGIN_INFO).nsrs
 * 
 */
 function  usersFilter (nsrs){
        var temp_nsrs = [];
        if (nsrs != "undefined" && nsrs != undefined && nsrs.length > 0) {
          temp_nsrs.push(nsrs[0]);
          for (let i = 1; i < nsrs.length; i++) {
            var nsrs_keys = [nsrs[i].shxydm, nsrs[i].gsnsrsbh, nsrs[i].dsnsrsbh];
            var nsrs_yhsfdm = Number(nsrs[i].yhsfdm);
            var ifexit = false;
            for (let j = 0; j < temp_nsrs.length; j++) {
              var temp_nsrs_keys = [
                temp_nsrs[j].shxydm,
                temp_nsrs[j].gsnsrsbh,
                temp_nsrs[j].dsnsrsbh
              ];
              var temp_nsrs_yhsfdm = Number(temp_nsrs[j].yhsfdm);
              if (this.ifEqual(nsrs_keys, temp_nsrs_keys) == true) {
                if (nsrs_yhsfdm < temp_nsrs_yhsfdm) {
                  temp_nsrs[j] = nsrs[i];
                }
                ifexit = true;
                break;
              }
            }
  
            if (ifexit == false) {
              temp_nsrs.push(nsrs[i]);
            }
          }
        }
  
        return temp_nsrs;
      }


      
    function  ifEqual(arr1, arr2) {
        var flag = false;
        for (var i = 0; i < arr1.length; i++) {
          flag = false;
          if (
            arr1[i] != "undefined" &&
            arr1[i] != undefined &&
            arr1[i] != "" &&
            arr2.indexOf(arr1[i]) > -1
          ) {
            flag = true;
            break;
          }
        }
        return flag;
      }

      
      
      
      export const userUtils = {
        usersFilter,
        ifEqual,
      }
    


