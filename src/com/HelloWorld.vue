<template>
    <div class="box">
        <div class="menu-list">
          <div class="total" :class="{active:item.id === sel}" v-for="item in tabs" :key="item.id" @click="select(item)">
              <b>{{ item.label }}</b>
          </div>
        </div>
        <div class="text">
          <div class="all" v-show="sel === 1">
            <div class="m-yer">
              <h2>2020年5月</h2>
              <div class="u-day">
                <span v-for="(item, index) in week" :key="index">{{item}}</span>
              </div>
              <div class="data">
                <span>6</span>
                <span>7</span>
                <span class="active">8</span>
                <span>9</span>
                <span>10</span>
                <span>11</span>
                <span>12</span>
              </div>
              <div class="m-buton" ></div>
            </div>
            <div class="m-lei">
                <div class="u-pro">
                  <div><span>11:00</span><i> </i></div>
                  <div><span>12:00</span><i> </i></div>
                  <div><span>13:00</span><i> </i></div>
                  <div><span>14:00</span><i> </i></div>
                  <div><span>15:00</span><i> </i></div>
                </div>
            </div>
          </div>
          <div class="all" v-show="sel === 2">
            <div class="m-yer">
              <h2>2020年5月</h2>
              <div class="u-day">
                <span v-for="(item, index) in week" :key="index">{{item}}</span>
              </div>
              <div class="data">
                <span>6</span>
                <span>7</span>
                <span class="active">8</span>
                <span>9</span>
                <span>10</span>
                <span>11</span>
                <span>12</span>
              </div>
              <div class="m-buton"></div>
            </div>
            <div class="m-lei">
              <div class="u-pro">
                <h3 class="u-yue">5月</h3>
                <div><span>08<br>周二</span><i></i></div>
                <div><span>09<br>周三</span><i></i></div>
                <div><span>10<br>周四</span><i></i></div>
                <div><span>11<br>周五</span><i></i></div>
                <div><span>12<br>周六</span><i></i></div>
              </div>
            </div>
          </div>
          <div class="all" v-show="sel === 3">
            <div id="dateContainer">
                <div class="date__showNowTime u-yue">
                  <span v-text="ynow"></span>年
                  <span v-text="mnow+1"></span>月
                  <span v-text="dnow"></span>日
                </div>
                <div class="u-day">
                  <span v-for="(item, index) in week" :key="index">{{item}}</span>
                </div>
                <table border="0" id="table" class="u-table">
          
                </table>
            </div>
          </div>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
          newDate: '',//当前的日期的信息
          ynow: '',//当前的年数
          mnow: '',//当前的月份
          dnow: '',//当前的天数
          firstDay: '',//第一天
          firstnow: '',//当前的星期
          m_days: [],//每个月的天数
          tr_str: '',//行数
          sel:1,
          week: ["日", "一", "二", "三", "四", "五", "六"],
          tabs: [
              {label: '日视图',num:0, id: 1},
              {label: '周视图',num: 0, id: 2},
              {label: '月视图',num: 0, id: 3},
          ]
        }
    },
    methods: {
      select(item){
        this.sel = item.id;
      },
      getDaysInfo() {
        var _this = this;
        this.sureDate(_this);
      },
      is_leap(year) {//判断是不是闰年
        return (year%100==0?(year%400==0?1:0):(year%4==0?1:0));
      },
      //下面的是画表格的方法，这个方法会根据数据画出我们需要的表格
      drawTable(jsonHtml) {
        var _this = this;
        var str = ``;
        var idx = '',date_str = '',isRed = '',hasMsg='';
        for(var i = 0; i< _this.tr_str; i++) {
          str+='<tr>';
          for(var k = 0; k < 7; k++) {
              idx = i*7+k;
              isRed = (k===0||k===6)?"isRed":"";
              date_str=idx-_this.firstnow+1;
            (date_str<=0 || date_str>this.m_days[this.mnow]) ? date_str=" " : date_str=idx-_this.firstnow+1;
            date_str==_this.dnow?hasMsg='<td class="thisDay" date="'+date_str +'"><span  class="'+isRed +'">'+date_str+'</span></td>':hasMsg='<td date="'+date_str +'"><span  class="'+isRed +'">'+date_str+'</span></td>';
 
            for(var l = 0, len = jsonHtml.length; l < len; l++) {
            if(date_str== jsonHtml[l].date) {
              var newStr = '<p>'+jsonHtml[l].msg +'</p>';
              date_str==_this.dnow?hasMsg='<td class="thisDay" date="'+date_str +'"><span  class="'+isRed +'">'+date_str+'</span>'+ newStr+'</td>':hasMsg='<td date="'+date_str +'"><span  class="'+isRed +'">'+date_str+'</span>'+ newStr+'</td>';
 
            }
            }
            str+=hasMsg;
           }
          str+='</tr>';
        }
        var table = document.getElementById('table');
        table.innerHTML = str;
      },
      //两个参数代表的含义分别是this对象以及判断当前的操作是不是在进行月份的修改
      sureDate(_this,other) {
        this.newDate = new Date();
        this.ynow = this.newDate.getFullYear();
        if(!other) {
          this.mnow=this.newDate.getMonth(); //月份
        }
        this.dnow=this.newDate.getDate(); //今日日期
        this.firstDay = new Date(this.ynow,this.mnow,1);
        this.firstnow=this.firstDay.getDay();
        this.m_days = [31,28+this.is_leap(this.ynow),31,30,31,30,31,31,30,31,30,31];
        this.tr_str = Math.ceil((_this.m_days[this.mnow] + this.firstnow)/7);
        this.showMsg();
      },
      preMon() {
        var _this = this;
        this.sureDate(_this,"up");
      },
      nextMon() {
        var _this = this;
        this.sureDate(_this,"next");
      },
      //通过接口返回的是我们当前的月份对应在日历中需要处理的事项
      showMsg() {
       var jsonHtml = [
         {
            date: 8,
            msg: '会议'
          },
          {
            date: 8,
            msg: '会议'
          },
        ];
       this.drawTable(jsonHtml)
      }
 
    },
    mounted() {
      //画出当前的月份的天数对应的表格
      this.getDaysInfo();
      //进行数据的获取，显示到对应的位置
    },
}
</script>

<style>
  .box{
    height: 48px;
  }
  .equi_container {
      display: flex;
      flex-direction: column;
  }
  .menu-list {
      display: flex;
      box-shadow: 0px 1px 0px 0px rgba(0,0,0,0.05), 0px 1px 0px 0px rgba(0,0,0,0.05) inset;
  }
  .total{
      flex: 1;
      height: 48px;
      line-height: 48px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      /*height: 100%;*/
      /*line-height: 0.44rem;*/
      background:#ffffff;
      color: #666666;;
      font-size: 14px;
      text-align:center;
      float:left;
     
  }
  .total.active{
    background: #ffa800;
    color: #444444;
  }
  .text{
      flex: 1;
  }
  .m-yer{
    width: 375px;
    height: 139px;
    background: #ffffff;
    border-radius: 0px 0px 12px 12px;
    margin-bottom: 11px;
    box-shadow: 0px 6px 10px 0px rgba(131,134,163,0.12); 
  }
.m-yer h2{
    height: 22px;
    font-size: 16px;
    font-family: PingFangSC, PingFangSC-Semibold;
    font-weight: 600;
    color: #366cb3;
    padding: 11px 0 11px 20px;
    margin: 0;
    line-height: 22px;
}
.u-day,.data{
  margin-bottom: 13px;
  display: flex;
}
.u-day span{
  font-size: 14px;
  text-align: center;
  flex: 1;
  color: #366cb3;
}
.data span{
  color: #444444;
  font-size: 14px;
  text-align: center;
  line-height: 38px;
  flex: 1;
}
.data span.active{
  width: 38px;
  height: 38px;
  display: block;
  float: left;
  background: #366cb3;
  border-radius: 10px;
}
.m-buton{
  width: 20px;
  height: 3px;
  margin: 0 auto;
  background: #366cb3;
}
.u-pro{
  margin-bottom: 30px;
}
.u-pro div{
  width: 100%;
  height: 30px;
  /* line-height: 30px; */
  margin-bottom: 30px;
}
.u-pro div span{
  font-size: 12px;
  font-weight: 400;
  color: #999999;
  float: left;
  margin: 0 13px 0 17px;
}
.u-pro div i{
  width: 301px;
  height: 1px;
  margin-top: 15px;
  float: left;
  background: #f1eff2;
}
.u-yue{
  font-size: 16px;
  color: #366cb3;
  margin: 8px 0 16px 17px;
  line-height: 22px;
}
.u-table{
  width: 100%;
}
.u-table tbody tr{
  display: flex;
  text-align: center;
}
.u-table tbody tr td{
  height: 81px;
  flex: 1;
}
table{
  border-collapse:collapse;  
  border-spacing:0px;  	    
  border: 0; 
 }
</style>