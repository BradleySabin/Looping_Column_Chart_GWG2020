
		//Width and height
		var margin = {top: 10, right: 10, bottom: 30, left: 10},
			width = 700 - margin.left - margin.right,
			height = 300 - margin.top - margin.bottom,
			data, labelPadding = 20, delaylength = 2000;
	

		//Create SVG element for chart
		var svg = d3.select("#myChart")
	  		.append("svg")
	    		.attr("width", width + margin.left + margin.right)
	    		.attr("height", height + margin.top + margin.bottom)
	  		.append("g")
	  		    .attr("transform","translate(" + margin.left + "," + margin.top + ")");
		
		d3.csv("JobLevelReformatted5.csv",function(data){ 

			dataset = data
			
			//converting measures 
			dataset.forEach(function(d) {
    			d.Race = d.Race;
    			d.IndividualContributor = +d.IndividualContributor;
    			d.ManagerSupervisor = +d.ManagerSupervisor;
    			d.Director = +d.Director;
    			d.Executive = +d.Executive;
			});


			//defining scales
 	 		var xScale = d3.scaleBand()
							.domain(dataset.map(function(d,i) { //categorical values
								return d.Race;
							}))
							.rangeRound([0, width])
							.padding(1);	

			var xColors = d3.scaleOrdinal()
							.domain(dataset.map(function(d,i) { //categorical values
								return d.Race;
							}))
							.range(["rgb(1,191,165)","rgb(187,190,192)","rgb(187,190,192)","rgb(187,190,192)","rgb(187,190,192)","rgb(187,190,192)"]);	

			var yScaleI = d3.scaleLinear()
							.domain([0, d3.max(dataset, function(d) {return d.IndividualContributor;})])
							.range([height,0]);

			var yScaleM = d3.scaleLinear()
							.domain([0, d3.max(dataset, function(d) {return d.ManagerSupervisor;})])
							.range([height,0]);

			var yScaleD = d3.scaleLinear()
							.domain([0, d3.max(dataset, function(d) {return d.Director;})])
							.range([height,0]);

		    var yScaleE = d3.scaleLinear()
							.domain([0, d3.max(dataset, function(d) {return d.Executive;})])
							.range([height,0]);




			//creating X axis (Race Labels)
			svg.append("g")
		  		.attr("class","xaxis")
		    	.attr("transform", "translate(0,"+height+")")
		    	.call(d3.axisBottom()
		    			.scale(xScale)
			    	)
	
			//creating Job Label
			d3.select("#JobLevelLabel")
				.select("#value")
				.text("Individual Contributor")
				.transition()
		   		.delay(500)
		   		.duration(1000)
		   		.on("start",function repeat(){
		   			d3.active(this)
		   				//manager
						.transition()
						.delay(delaylength)
			            .duration(1000)
			            .text("Manager/Supervisor")
			            //director
						.transition()
						.delay(delaylength)
			            .duration(1000)
			            .text("Director")
			            //executive
						.transition()
						.delay(delaylength)
			            .duration(1000)
			            .text("Executive")
			            //back to beginning
						.transition()
						.delay(delaylength)
			            .duration(1000)
			            .text("Individual Contributor")
			            .on("end",repeat)
			    });


			//Create bars
			 svg.selectAll("rect")
			   .data(dataset)
			   .enter()
			   .append("rect")
			   .attr("x", function(d, i) {
			   		return  xScale(d.Race)-60/2;
			   })
			   .attr("y", function(d) {
			   		return yScaleI(d.IndividualContributor);
			   })
			   .attr("width", 60)
			   .attr("height", function(d) {
			   		return height - yScaleI(d.IndividualContributor);
			   })
			   .attr("fill", function(d) {
					return xColors(d.Race);
			   })
			   .transition()
			   		.delay(500)
			   		.duration(1000)
			   		.on("start",function repeat(){
			   			//manager
						d3.active(this)
							.transition()
							.delay(delaylength)
				            .duration(1000)
				            .attr("y",function(d){
								return yScaleM(d.ManagerSupervisor);
				            })
				            .attr("height", function(d){
				              return height - yScaleM(d.ManagerSupervisor);
				            })
				        //director
							.transition()
							.delay(delaylength)
				            .duration(1000)
				            .attr("y", function(d){
								return yScaleD(d.Director);

				            })
				            .attr("height", function(d){
				              return height - yScaleD(d.Director);
				            })
				        //executive
							.transition()
							.delay(delaylength)
				            .duration(1000)
				            .attr("y", function(d){
								return yScaleE(d.Executive);

				            })
				            .attr("height", function(d){
				              return height - yScaleE(d.Executive);
				            })  
				        //back to beginning
				            .transition()
			   				.delay(delaylength)
				            .duration(1000)
				            .attr("y", function(d){
				              return yScaleI(d.IndividualContributor)
				            })
				            .attr("height", function(d){
				              return height - yScaleI(d.IndividualContributor)
				            })
				            .on("end",repeat)
			   		});


			//Create labels
			 svg.selectAll("text.labels")
			   .data(dataset)
			   .enter()
			   .append("text")
			   .attr("class","labels")
			   .text(function(d) {
			   		return d.IndividualContributor + "%";
			   })
			   .attr("text-anchor", "middle")
			   .attr("x", function(d, i) {
		   		return xScale(d.Race);
		   	   })
			   .attr("y", function(d) {
		   		return yScaleI(d.IndividualContributor) + labelPadding;
		   		})
			   .attr("font-family", "sans-serif")
			   .attr("font-size", "14px")
			   .attr("fill", "Black")
			   .transition()
			   		.delay(500)
			   		.duration(1000)
			   		.on("start",function repeat(){
						d3.active(this)
						//manager
							.transition()
							.delay(delaylength)
				            .duration(1000)
				            .text(function(d) {
			   					return d.ManagerSupervisor + "%";
			   				})
				            .attr("y",function(d){
								return yScaleM(d.ManagerSupervisor) +labelPadding;
				            })
				        //director
							.transition()
							.delay(delaylength)
				            .duration(1000)
				            .text(function(d) {
			   					return d.Director + "%";
			   				})
				            .attr("y",function(d){
								return yScaleD(d.Director) +labelPadding;
				            })
				        //executive
							.transition()
							.delay(delaylength)
				            .duration(1000)
				            .text(function(d) {
			   					return d.Executive + "%";
			   				})
				            .attr("y",function(d){
								return yScaleE(d.Executive) +labelPadding;
				            })
				        //executive
							.transition()
							.delay(delaylength)
				            .duration(1000)
				            .text(function(d) {
			   					return d.IndividualContributor + "%";
			   				})
				            .attr("y",function(d){
				            	var yScale = d3.scaleLinear()
											.domain([0, d3.max(dataset, function(d) {return d.IndividualContributor;})])
											.range([height,0]);
								return yScaleI(d.IndividualContributor) +labelPadding;
				            })
				            .on("end",repeat)
			   		});


			//creating Job Label
			d3.select("#JobLevelLabel")
				.select("#value")
				.text("Individual Contributor")
				.transition()
		   		.delay(500)
		   		.duration(1000)
		   		.on("start",function repeat(){
		   			d3.active(this)
		   				//manager
						.transition()
						.delay(delaylength)
			            .duration(1000)
			            .text("Manager/Supervisor")
			            //director
						.transition()
						.delay(delaylength)
			            .duration(1000)
			            .text("Director")
			            //executive
						.transition()
						.delay(delaylength)
			            .duration(1000)
			            .text("Executive")
			            //back to beginning
						.transition()
						.delay(delaylength)
			            .duration(1000)
			            .text("Individual Contributor")
			            .on("end",repeat)
			    });


			//creating Y axis  	    
			svg.append("g")
		  		.attr("class","yaxis")
		    	.attr("transform", "translate("+45+",0)")
		    	.call(d3.axisLeft()
		    			.scale(yScaleI)
		    			.ticks(6)
		    			.tickFormat(x => `${x.toFixed(0)}%`)
		    			.tickSizeOuter(0) //no outer ticks
		    		)
		    	.transition()
		   		.delay(500)
		   		.duration(1000)
		   		.on("start",function repeat(){
		   			d3.active(this)
		   				//manager
						.transition()
						.delay(delaylength)
			            .duration(1000)
			            .call(d3.axisLeft()
			    			.scale(yScaleM)
			    			.ticks(5)
			    			.tickFormat(x => `${x.toFixed(0)}%`)
		    			)
						//director
						.transition()
						.delay(delaylength)
			            .duration(1000)
			            .call(d3.axisLeft()
			    			.scale(yScaleD)
			    			.ticks(5)
			    			.tickFormat(x => `${x.toFixed(0)}%`)
		    			)
						//executive
						.transition()
						.delay(delaylength)
			            .duration(1000)
			            .call(d3.axisLeft()
			    			.scale(yScaleE)
			    			.ticks(5)
			    			.tickFormat(x => `${x.toFixed(0)}%`)
		    			)
		    			//back to the beginning
						.transition()
						.delay(delaylength)
			            .duration(1000)
			            .call(d3.axisLeft()
			    			.scale(yScaleI)
			    			.ticks(6)
			    			.tickFormat(x => `${x.toFixed(0)}%`)
		    			)
		    			.on("end",repeat)

		    		//update color of Y axis labels for every transistion
						d3.selectAll("g.tick")
							.selectAll("text")
							.attr("fill","#57595D") 
							.attr("font-size","12")
			    });
			
			//update color of Y axis labels for first rendering
			d3.selectAll("g.tick")
				.selectAll("text")
				.attr("fill","#57595D") 
				.attr("font-size","12")


		}); //data import
