<div style="height:4em; border-bottom:1px solid gray; padding: 1em;">
	< sorting options >
</div>
<ul class="list">
{{#each users}}
	<li>
		<div>
			<a href="https://commons.wikimedia.org/wiki/User:{{user}}" title="{{user}}" target="_blank">
				{{user}}
			</a>

			<ul>
			{{#each files}}

				<li>
					{{date}} - {{count}}
				</li>
			{{/each}}
			</ul>

		</div>
		<div class="clear">
	</li>
{{/each}}
</ul>