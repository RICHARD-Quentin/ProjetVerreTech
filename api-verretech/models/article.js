
module.exports = (sequielize,DataTypes) => sequielize.define('article', {
  id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: true
    },
    name: {
      type: DataTypes.STRING(24),
      allowNull: false
    },    
    photoUrls: {
      type: DataTypes.STRING,
      allowNull: true,
      get: function() {
        var strArray = this.getDataValue('photoUrls').split(",");
        var newArray = [];
        strArray.forEach(element => {
          if(element.substring(0, 4) == "http" || element.substring(0, 4) == "https")
          {
            newArray.push(element)
          }else
          {
            newArray.push(process.env.DOMAIN+"src/"+element);
          }       
        });
        return newArray;
      },
      set: function(values){
        let resultStr = "";
        
        if(Array.isArray(values))
        {
          for (var i = 0;i<values.length; i++) 
          {
          console.log(values[i])
          resultStr += values[i];
          if(values.length-1 != i )resultStr += ',';
          }
        }
        else
        {
          resultStr = values;
        }
        
        this.setDataValue('photoUrls',resultStr);

        return resultStr
      }
    },
    status: {
      type: DataTypes.ENUM('available','pending','sold'),
      allowNull: true
    }},
    {
      timestamps: false,
      tableName: "article",
      freezeTableName: false,
    }
);



