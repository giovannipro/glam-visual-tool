<ul class="list">
{{#each nodes}}
	<li>
		<div class="item" style="font-size:0.8em; margin-right:1em; width: 70%;">
			<span class="id" id="{{id}}">
				{{!-- {{#replace "a" "x"}} --}}
				{{id}}
				{{!-- {{/replace}} --}}
			</span>
			<br>
			<span>
				{{files}} files
			</span>
		</div>
		<div class="link" style="font-size:0.6em;">
			<a href="https://commons.wikimedia.org/wiki/Category:{{id}}" title="{{id}}" target="_blank">
				link
			</a>
		</div>
		<div class="clear">
	</li>
{{/each}}
</ul>