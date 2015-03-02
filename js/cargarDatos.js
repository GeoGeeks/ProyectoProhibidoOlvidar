      require([
        "dojo/dom", "dojo/on",
        "esri/tasks/query", "esri/tasks/QueryTask", "dojo/domReady!"
      ], function (dom, on, Query, QueryTask) {

        var queryTask = new QueryTask("http://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Demographics/ESRI_Census_USA/MapServer/5");

        var query = new Query();
        query.returnGeometry = false;
        
        query.outFields = [
          "SQMI", "STATE_NAME", "STATE_FIPS", "SUB_REGION", "STATE_ABBR",
          "POP2000", "POP2007", "POP00_SQMI", "POP07_SQMI", "HOUSEHOLDS",
          "MALES", "FEMALES", "WHITE", "BLACK", "AMERI_ES", "ASIAN", "OTHER",
          "HISPANIC", "AGE_UNDER5", "AGE_5_17", "AGE_18_21", "AGE_22_29",
          "AGE_30_39", "AGE_40_49", "AGE_50_64", "AGE_65_UP"
        ];

        on("click", execute);

        function execute() {
          query.text = "California";
          queryTask.execute(query, showResults);
        }

        function showResults (results) {
          var resultItems = [];
          var resultCount = results.features.length;
          for (var i = 0; i < resultCount; i++) {
            var featureAttributes = results.features[i].attributes;
            for (var attr in featureAttributes) {
              resultItems.push("<b>" + attr + ":</b>  " + featureAttributes[attr] + "<br>");
            }
            resultItems.push("<br>");
          }
          //dom.byId("info").innerHTML = resultItems.join("");
          console.log(resultItems.join(""));
        }

      });