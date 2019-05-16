<template>
  <div class="graph-d3">
    <h3>{{title}}</h3>
    <div class="buttons-container">
      <template v-for="line in lineCount">
        <button
          :class="'btn'+(line-1)+'-'+locationKey"
          @click="hideLine(line-1); toggleButtonColor(line-1)"
          :key="line-1"
        >{{line}} {{getSubstance(line-1)[0]}}</button>
      </template>
      <!-- <button class="btn1" v-if="lineCount>=2" @click="hideLine(1)">{{getSubstance(1)[0]}}</button>-->
    </div>
    <div class="svg-container" width="100%" :height="svgSize.width*(9/16)">
      <svg
        class="svg-content"
        :class="'svg-content'+locationKey"
        preserveAspectRatio="xMinYMin meet"
        :width="svgSize.width"
        :viewBox="'0 0 '+svgSize.width+' '+svgSize.height"
      >
        <template v-for="line in lineCount">
          <g :class="'graph'+(line-1)+'-'+locationKey" v-show="hideShow[line-1].viz" :key="line-1"></g>
        </template>
        <!-- <g class="graph1" v-if="lineCount>=2" v-show="hideShow[1].viz"></g> -->
      </svg>
    </div>
    <!-- <p><b>substance Count</b> : {{lineCount}} // <b>dataSet Count</b> : {{dataSetCount}} //</p>
    <p><b>alldata</b> : {{allData}}</p>
    <p><b>hideShow</b> : {{hideShow}}</p>
    <p><b>dates</b> : {{dates}} //</p>
    <p><b>substance</b> : {{getSubstance(0)[1]}} //<br/>{{getSubstance(lineCount-1)}}</p>
    <p><b>fullset</b> : {{FakeDataset}}</p>-->
  </div>
</template>

<script>
import * as d3 from "d3";
import FakeData from "@/components/FakeData";
export default {
  props: ["sampleLocation"],
  data() {
    return {
      title: "Graph",
      colors: [
        "red",
        "blue",
        "green",
        "violet",
        "blueviolet",
        "orange",
        "pink",
        "yellow",
        "gray",
        "aquamarine"
      ],
      allData: "",
      FakeDataset: FakeData.prelevement,
      locationKey: 2,
      dataSetCount: 1000,
      lineCount: 10,
      svgSize: { height: 300, width: 750 },
      graphStroke: 1,
      pointToStrokeRatio: 1.5,
      margin: [10, 20, 25, 35],
      dates: "",
      substance: "",
      substanceValues: "",
      hideShow: [
        { viz: true },
        { viz: true },
        { viz: true },
        { viz: true },
        { viz: true },
        { viz: true },
        { viz: true },
        { viz: true },
        { viz: true },
        { viz: true }
      ]
    };
  },
  created() {
    this.locationKey = this.getLocation();
    this.lineCount = this.checkMaxLineCount();
    this.dataSetCount = this.checkMaxDatasetCount();
    //this.getHideShowArray2();
    //this.hideShow = this.getHideShowArray();
    this.allData = this.getAllData(this.lineCount);
    this.dates = this.getDates();
    this.title = this.getTitle();
  },
  mounted() {
    this.drawAllLines(this.lineCount, this.graphStroke);
    this.drawAxis(this.allData, this.getStartDate(), this.getEndDate());

    this.getbuttonColors(this.lineCount);
  },
  methods: {
    getLocation() {
      return this.sampleLocation;
    },
    checkMaxLineCount() {
      if (this.lineCount > this.FakeDataset[0].location1.length) {
        return this.FakeDataset[0]["location" + this.locationKey].length;
      } else {
        return this.lineCount;
      }
    },
    checkMaxDatasetCount() {
      if (
        this.dataSetCount === null ||
        this.dataSetCount === undefined ||
        this.dataSetCount > this.FakeDataset.length
      ) {
        return this.FakeDataset.length;
      } else if (this.dataSetCount <= 1) {
        return 1;
      } else {
        return this.dataSetCount;
      }
    },
    getTitle() {
      let allKeys = Object.keys(this.FakeDataset[0]);
      return allKeys[this.locationKey + 2];
    },
    getHideShowArray2() {
      for (let i = 0; i < this.lineCount.length; i++) {
        this.hideShow.$add(viz, true);
      }
    },
    getHideShowArray() {
      const vizArray = "";
      for (let i = 0; i < this.lineCount.length; i++) {
        vizArray.push({ viz: true });
      }
      return vizArray;
    },
    hideLine(lineIndex) {
      return (this.hideShow[lineIndex].viz = !this.hideShow[lineIndex].viz);
    },
    getStartDate() {
      return new Date(this.FakeDataset[0].date);
    },
    getEndDate() {
      return new Date(this.FakeDataset[this.FakeDataset.length - 1].date);
    },
    getDates() {
      const allDates = this.FakeDataset.map(item => item.date);
      return allDates;
    },
    getSubstance(substanceIndex) {
      const substanceSelected = this.FakeDataset.map(
        a => a["location" + this.locationKey][substanceIndex]
      );
      const values = substanceSelected.map(a => {
        if (a != undefined) {
          return a.value;
        } else {
          return 10;
        }
      });
      let substanceName = "";
      if (substanceSelected[0] != undefined) {
        substanceName = substanceSelected[0].name;
      } else {
        substanceName = "ERROR";
      }

      const result = [substanceName, [...values]];
      return result;
    },
    getAllData(numOfSubstances) {
      const allArrays = [];
      for (let i = 0; i < numOfSubstances; i++) {
        allArrays.push(...this.getSubstance(i)[1]);
      }
      return allArrays;
    },
    getbuttonColors(numOfSubstances) {
      for (let i = 0; i < numOfSubstances; i++) {
        d3.select(".btn" + i + "-" + this.locationKey).style(
          "background-color",
          this.colors[i]
        );
      }
    },
    toggleButtonColor(substanceIndex) {
      if (this.hideShow[substanceIndex].viz) {
        d3.select(".btn" + substanceIndex + "-" + this.locationKey)
          .style("background-color", this.colors[substanceIndex])
          .style("color", "black");
      } else {
        d3.select(".btn" + substanceIndex + "-" + this.locationKey)
          .style("background-color", "#ddd")
          .style("color", "gray");
      }
    },
    getScales(substanceValues) {
      const x = d3
        .scaleTime()
        .range([this.margin[3], this.svgSize.width - this.margin[1]]);
      const y = d3
        .scaleLinear()
        .range([this.svgSize.height - this.margin[2], this.margin[0]]);
      //d3.axisLeft().scale(x);
      //d3.axisBottom().scale(y);
      //x.domain(d3.extent(substanceValues, (d, i) => i));
      x.domain(d3.extent(this.dates, (d, i) => new Date(d).getTime()));
      y.domain([0, d3.max(this.allData, d => d)]);
      return { x, y };
    },
    calculatePath(substanceValues, parentClass, lin, color, strokeSize) {
      const scale = this.getScales(substanceValues);
      const path = d3
        .line()
        //.x((d, i) => scale.x(i))
        .x((d, i) => scale.x(new Date(this.dates[i]).getTime()))
        .y(d => scale.y(d))
        .curve(d3.curveMonotoneX);
      const line = d3
        .select(parentClass)
        .append("path")
        .attr("class", lin)
        .attr("d", path(substanceValues))
        .style("fill", "none")
        .style("stroke", color)
        .style("stroke-width", strokeSize)
        .style("stroke-linecap", "round")
        .style("stroke-linejoin", "round")
        .style("opacity", 0.7);
    },
    addPoints(substanceValues, name, parentClass, color, strokeSize) {
      const scale = this.getScales(substanceValues);
      substanceValues.forEach((d, i) => {
        const circle = d3
          .select(parentClass)
          .append("circle")
          .attr("class", name)
          //.attr("cx", scale.x(i))
          .attr("cx", scale.x(new Date(this.dates[i]).getTime()))
          .attr("cy", scale.y(d))
          .attr("r", strokeSize * this.pointToStrokeRatio)
          .style("fill", color)
          .style("opacity", 0.7);
      });
    },
    drawLine(substanceValues, substanceIndex, parentClass, color, strokeSize) {
      this.calculatePath(
        substanceValues,
        parentClass,
        "line" + substanceIndex.toString(),
        color,
        strokeSize
      );
      this.addPoints(
        substanceValues,
        "circle" + substanceIndex,
        parentClass,
        color,
        strokeSize
      );
    },
    drawAllLines(numOfSubstances, strokeSize) {
      for (let i = 0; i < numOfSubstances; i++) {
        this.drawLine(
          this.getSubstance(i)[1],
          i,
          ".graph" + i + "-" + this.locationKey,
          this.colors[i],
          strokeSize
        );
      }
    },
    drawAxis(arrData, startDate, endDate) {
      const axisGroup = d3
        .select(".svg-content" + this.locationKey)
        .append("g")
        .attr("class", "axis-group")
        .attr(
          "transform",
          "translate(" + this.margin[3] + " ," + this.margin[2] * -0 + ")"
        );

      const scaleX = d3
        .scaleTime()
        .domain([startDate, endDate])
        .range([this.margin[3], this.svgSize.width - this.margin[1]]);

      const scaleY = d3
        .scaleLinear()
        .domain([0, d3.max(arrData)])
        .range([this.svgSize.height - this.margin[2], this.margin[0]]);

      //const x_axis = d3.axisBottom().tickFormat(d3.timeFormat("%Y-%m")).ticksValues(this.dates).scale(scaleX);
      const x_axis = d3
        .axisBottom()
        .ticks(8)
        .scale(scaleX);
      const y_axis = d3.axisLeft().scale(scaleY);

      axisGroup
        .append("g")
        .attr(
          "transform",
          "translate(" +
            (0 - this.margin[3]) +
            " ," +
            (this.svgSize.height - this.margin[2]) +
            ")"
        )
        .call(x_axis);
      axisGroup.append("g").call(y_axis);
    }
  }
};
</script>

<style scoped>
.graph-d3 {
  color: black;
  background-color: lightseagreen;
  margin: 0px 10px;
  padding: 10px;
}
h1,
h2,
h3 {
  color: white;
}
.h3 {
  margin-bottom: 0px;
}
.svg-container {
  display: inline-block;
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.svg-content {
  background-color: white;
  width: 100%;
  display: inline-block;
  position: relative;
  top: 0;
  left: 0;
}
.buttons-container {
  margin: 0px;
}
.buttons-container button {
  float: left;
  /*margin: 2px;*/
  margin-top: 0px;
  border: 0px solid black;
  padding: 5px 10px;
  cursor: pointer;
}
</style>