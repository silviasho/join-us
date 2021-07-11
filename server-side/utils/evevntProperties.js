
const ifUseraskedToJoin = async (user,events) => {
   
events.forEach((obj,i)=>{
        const isRequested=obj.requestsPending.find(item=>item===user.userId)
        obj.requestsPending=Boolean(isRequested)
    })
};



module.exports = { ifUseraskedToJoin};