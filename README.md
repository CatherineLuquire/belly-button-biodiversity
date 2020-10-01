# Belly Button Biodiversity Visualizations with Plotly

Created interactive dashboard to view top belly button bacteria, number of washes per week, and demographic info of study test subjects.

## Table of contents

* [Technologies](#technologies)
* [Installation](#installation)
* [Development Process](#development-process)
* [Data Sources](#data-sources)
* [Contact](#contact)

## Technologies

* Javascript:
  * d3 - version 5.5
  * Plotly - version 1.56.0
* HTML & CSS
  * Bootstrap - version 3.3.7

## Installation and Usage
Installation: 
1. Link Bootstrap stylesheet in index header for HTML visualization and functionality.
2. Link d3 script in index body for javascript code functionality.
3. Link plotly script in index body for charting purposes.
4. Reference app.js and samples.json in index body to link dataset and code. 

Usage:
1. Select "Test Subject ID No" from the dropdown list to see OTU, demographic, and washing frequency for each different subject. 

## Development Process

* Used d3 to bind the data to the HTML document and build interactive visualizations including charts, a panel of demograpic information, and a dropdown menu to select different test subjects.
![Dropdown Menu](images/dropdown_menu.jpg)
* Used Plotly to create interactive chart visualizations including: 
1. a horizontal bar chart displaying the amount of the 10 most prolific bacteria found in the test subject's belly button.
[!Horizontal Bar Chart](images/horizontal_bar_chart.png)
2. a bubble chart to visualize the amount of each bacteria, scaled to the quantity found.
[!Bubble Chart](images/bubble_plot.png)
3. a gauge to visualize the amount of times the test subject washes their belly button a week.
[!Washing Gauge](images/washing_gauge.png)

## Data Sources
* [Link to local Belly Button Data](samples.json)
* Data sourced from: Hulcr, J. et al.(2012) _A Jungle in There: Bacteria in Belly Buttons are Highly Diverse, but Predictable_. Retrieved from: [http://robdunnlab.com/projects/belly-button-biodiversity/results-and-data/](http://robdunnlab.com/projects/belly-button-biodiversity/results-and-data/)

## Contact
Created by [Katy Luquire](https://github.com/CatherineLuquire)
