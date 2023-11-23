const { productModel,categoryModel } = require('../../models/index')
const { findOne, create, updateOne,find } = require('../../utils/dbOperations')
exports.categoryList=async()=>{
       let data = await find(categoryModel,{})
      
        let root = [];
        let child = [];
    
        data.forEach((node) => {
            if (node.category == null) return root.push(node);
            if (node.category) return child.push(node);
          });
      
          function recursion(child, root) {
            for (var a of root) {
              a._doc.subcategory = [];
              for (var b of child) {
                if (b.category.toString() == a._id.toString()) {
                  a._doc.subcategory.push(b);
                }
              }
              if (a._doc.subcategory != null) {
                recursion(child, a._doc.subcategory);
              }
            }
          }
          recursion(child, root);

          if(root){

              return{
                statusCode:200,
                status:true,
                message:"Category List",
                data:root
              }
          }
}