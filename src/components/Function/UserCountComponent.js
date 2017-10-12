import echarts from 'echarts/lib/echarts';
import  'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

function UserCountComponent({ dispatch, data, loading}) 
{	
	if (!loading)
	{
		var xAxisData = [];
		var yAxisData = [];
		
		for(var key in data){
		    xAxisData.push(key);
            yAxisData.push(data[key]);
		}
		
		var myChart = echarts.init(document.getElementById('main'));
        // 绘制图表
        myChart.setOption({
            title: { text: '注册用户统计' },
            tooltip: {},
            xAxis: {
                data: xAxisData
            },
            yAxis: {
			},
            series: [{
                name: '用户数量',
                type: 'bar',
                data: yAxisData
            }],
			label:{ 
				normal:{ 
					show: true, 
					position: 'outside'
				} 
			},
        });
	}
	
    return (
            <div id="main" style={{ width: 800, height: 600 }}>
			</div>
        );
}


export default UserCountComponent;
