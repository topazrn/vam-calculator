<h1 class="is-size-2">About</h1>
<p>
  Automatically solve Transportation Problems online using the <strong>Vogel's Approximation Method</strong> by simply inputting them. No software to install and results are ready right away!
</p>
<br />
<p><strong>Definition:</strong> The<strong>&nbsp;Vogel’s Approximation Method</strong> or <strong>VAM</strong> is an iterative procedure calculated to find out the initial feasible solution of the transportation problem. Like Least cost Method, here also the shipping cost is taken into consideration, but in a relative sense.</p>
<p>The following is the flow chart showing the steps involved in solving the transportation problem using the Vogel’s Approximation Method:</p>
<p>
  <a href="https://businessjargons.com/wp-content/uploads/2015/12/VAM-1.jpg"><img class="size-full wp-image-2559 aligncenter" src="https://businessjargons.com/wp-content/uploads/2015/12/VAM-1.jpg" alt="VAM-1" width="500" height="518" srcset="https://businessjargons.com/wp-content/uploads/2015/12/VAM-1.jpg 500w, https://businessjargons.com/wp-content/uploads/2015/12/VAM-1-290x300.jpg 290w" sizes="(max-width: 500px) 100vw, 500px" /></a><br />
</p>
<h2 class="is-size-4">The concept of Vogel’s Approximation Method can be well understood through an illustration given below:</h2>
<ol type="1">
  <li>First of all the difference between two least cost cells are calculated for each row and column, which can be seen in the iteration given for each row and column. Then the largest difference is selected, which is 4 in this case. So, allocate 20 units to cell BD, since the minimum cost is to be chosen for the allocation. Now, only 20 units are left with the source B.<br><a href="https://businessjargons.com/wp-content/uploads/2015/12/VAM-2.jpg"><img class="size-full wp-image-2560 aligncenter" src="https://businessjargons.com/wp-content/uploads/2015/12/VAM-2.jpg" alt="VAM-2" width="400" height="232" srcset="https://businessjargons.com/wp-content/uploads/2015/12/VAM-2.jpg 400w, https://businessjargons.com/wp-content/uploads/2015/12/VAM-2-300x174.jpg 300w" sizes="(max-width: 400px) 100vw, 400px" /></a></li>
  <li>Column D is deleted, again the difference between the least cost cells is calculated for each row and column, as seen in the iteration below. The largest difference value comes to be 3, so allocate 35 units to cell AF and 15 units to the cell AE. With this, the Supply and demand of source A and origin F gets saturated, so delete both the row A and Column F.<br><a href="https://businessjargons.com/wp-content/uploads/2015/12/Vogels-1.jpg"><img class="size-full wp-image-2569 aligncenter" src="https://businessjargons.com/wp-content/uploads/2015/12/Vogels-1.jpg" alt="Vogel's-1" width="400" height="291" srcset="https://businessjargons.com/wp-content/uploads/2015/12/Vogels-1.jpg 400w, https://businessjargons.com/wp-content/uploads/2015/12/Vogels-1-300x218.jpg 300w" sizes="(max-width: 400px) 100vw, 400px" /></a></li>
  <li>Now, single column E is left, since no difference can be found out, so allocate 60 units to the cell CE and 20 units to cell BE, as only 20 units are left with source B. Hence the demand and supply are completely met.<br><a href="https://businessjargons.com/wp-content/uploads/2015/12/Vogels-final.jpg"><img class="size-full wp-image-2573 aligncenter" src="https://businessjargons.com/wp-content/uploads/2015/12/Vogels-final.jpg" alt="Vogel's-final" width="400" height="271" srcset="https://businessjargons.com/wp-content/uploads/2015/12/Vogels-final.jpg 400w, https://businessjargons.com/wp-content/uploads/2015/12/Vogels-final-300x203.jpg 300w" sizes="(max-width: 400px) 100vw, 400px" /></a></li>
</ol>
<p>Now the total cost can be computed, by multiplying the units assigned to each cell with the cost concerned. Therefore,</p>
<p><strong>Total Cost</strong> = 20*3 + 35*1 + 15*4 + 60*4 + 20*8 = Rs 555</p>
<p><strong>Note:</strong> Vogel’s Approximation Method is also called as <strong>Penalty Method</strong> because the difference costs chosen are nothing but the penalties of not choosing the least cost routes.</p><br>

<h3>Related terms:</h3>
<ol type="i">
  <li><a href="https://businessjargons.com/least-cost-method.html" rel="bookmark" title="Least Cost Method">Least Cost Method </a></li>
  <li><a href="https://businessjargons.com/stepping-stone-method.html" rel="bookmark" title="Stepping Stone Method">Stepping Stone Method </a></li>
  <li><a href="https://businessjargons.com/north-west-corner-rule.html" rel="bookmark" title="North-West Corner Rule">North-West Corner Rule </a></li>
  <li><a href="https://businessjargons.com/modified-distribution-method.html" rel="bookmark" title="Modified Distribution Method">Modified Distribution Method </a></li>
  <li><a href="https://businessjargons.com/transportation-method-of-linear-programming.html" rel="bookmark" title="Transportation Method of Linear programming">Transportation Method of Linear programming </a></li>
</ol>
<br />
<h3>Source <a href="https://businessjargons.com/vogels-approximation-method.html#:~:text=Definition%3A%20The%20Vogel's%20Approximation%20Method,but%20in%20a%20relative%20sense.">Business Jargons</a></h3>
<br />

<style>

</style>