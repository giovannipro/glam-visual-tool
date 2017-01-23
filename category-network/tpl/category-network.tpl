<div style="height:4em; border-bottom:1px solid gray; padding: 1em;">
	< sorting options >
</div>
<ul class="list">
{{#each nodes}}
	<li>
		<div class="item">
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
		<div class="link">
			<a href="https://commons.wikimedia.org/wiki/Category:{{id}}" title="{{id}}" target="_blank">
				link
			</a>
		</div>
		<div class="clear">
	</li>
{{/each}}
</ul>