<template>
  <div class="level0">
      <h3>{{title}}</h3>
    <div class="prelev" v-for="item in FakeDataset" :key="item.id">
      <h4 class="date">{{dateDisplay(item.date)}} </h4>
      <p>Location0</p>
      <div class="lefty">
        <ul>
          <li v-for="{name,id} in item.location0" :key="id">{{name}} :</li>
        </ul>
      </div>
      <div class="righty">
        <ul>
          <li v-for="{id,value} in item.location0" :key="id">
            {{value}} {{unit}}
          </li>
        </ul>
      </div>
      <p>Location1</p>
      <div class="lefty">
        <ul>
          <li v-for="{name,id} in item.location1" :key="id">{{name}} :</li>
        </ul>
      </div>
      <div class="righty">
        <ul>
          <li v-for="{id,value} in item.location1" :key="id">
            {{value}} {{unit}}
          </li>
        </ul>
      </div>
      <p>Location2</p>
      <div class="lefty">
        <ul>
          <li v-for="{name,id} in item.location2" :key="id">{{name}} :</li>
        </ul>
      </div>
      <div class="righty">
        <ul>
          <li v-for="{id,value} in item.location2" :key="id">
            {{value}} {{unit}}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import FakeData from "@/components/FakeData";
export default {
  name: "ChemChart",
  data() {
    return {
      title: "Mesures",
      FakeDataset : FakeData.prelevement,
      unit: "mg/L"
    };
  },
  methods: {
    dateDisplay(dateToDisplay){
      const months = ["Jan","Fev","Mars","Mai","Juin","Juil","Aout","Sep","Oct","Nov","Dec"]
      let result = "";
      let newDate = new Date(dateToDisplay);
      let day = newDate.getDate();
      if(day < 10){ day = "0"+day}
      if(day != 1){
      result += day;
      result += " ";
      }
      let month = newDate.getMonth();
      result += months[month];
      let year = newDate.getFullYear();
      result += " "+year;
      return result;
    }
  }
};
</script>

<style scoped>
.level0 {
  background-color: lightseagreen;
  margin: 0px 10px;
  padding: 3px;
}

.prelev {
  display: inline-block;
  text-align: left;
  width: 46%;
  background-color: #fff;
  padding: 5px 10px 5px 5px;
  margin: 5px;
  min-width:280px;
  max-width: 330px;
}

.lefty {
  float: left;
}

.righty {
  float: right;
}

.date {
    display: block;
  font-weight: bold;
  padding-left:20px;
}

.lefty li {
  list-style-type: square;
  text-align: left;
  padding-bottom: 2px;
}

.righty li {
    list-style-type: none;
    text-align: right;
    padding-bottom: 2px;
}

</style>


