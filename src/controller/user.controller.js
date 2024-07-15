/* eslint-disable no-undef */

const {
  findingUserInDB,
  gettingDatafromAPI,
} = require("../service/user.service");
const httpStatus = require("http-status");

async function handleGetRequest(req, res) {
  const { username } = req.params;
  try {
    const findingUser = await findingUserInDB(username);
    if(findingUser.length!=0){ 
      res.status(httpStatus.OK).json(findingUser)
    }
    if(findingUser==0){
    const callingAPI = await gettingDatafromAPI(username);
    if (callingAPI) {
      return res.status(httpStatus.CREATED).json(callingAPI);
    } else {
      return res.status(httpStatus.NOT_FOUND).json({ message: 'GitHub user not found' });
    }
  }
    

  } catch (error) {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "error", error });
  }
}

module.exports = { handleGetRequest };