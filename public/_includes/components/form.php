<form>
	<fieldset class="fields-group">
		<div>
			<label for="text">Text</label>
			<input type="text" name="text" id="text">
		</div>
		<div>
			<label for="text-value">Text (with value)</label>
			<input type="text" name="text-value" id="text-value" value="A test value">
		</div>
		<div>
			<label for="text-required">Text (required)</label>
			<input type="text" name="text-required" id="text-required" required>
		</div>
		<div>
			<label for="text-placeholder">Text (with placeholder)</label>
			<input type="text" name="text-placeholder" id="text-placeholder" placeholder="A placeholder value">
		</div>
		<div>
			<span class="label">Two inputs</span>
			<ul class="fields-list">
				<li>
					<input type="text" name="text-group-1" id="text-group-1" placeholder="A placeholder value">
				</li>
				<li>
					<input type="text" name="text-group-2" id="text-group-2" placeholder="A placeholder value" class="error">
					<span class="error-text">Required</span>
				</li>
			</ul>
		</div>
		<div>
			<ul class="fields-split base-block-grid-24 tablet-small-block-grid-12 tablet-small-flush-2">
				<li>
					<label for="text-group-5">Text input</label>
					<input type="text" name="text-group-5" id="text-group-5" placeholder="A placeholder value">
				</li>
				<li>
					<label for="text-group-6">Text input</label>
					<input type="text" name="text-group-6" id="text-group-6" placeholder="A placeholder value" class="error">
					<span class="error-text">Required</span>
				</li>
			</ul>
		</div>
		<div>
			<span class="label">Two inputs, split: 1/2</span>
			<ul class="fields-split base-block-grid-24 tablet-small-block-grid-12 tablet-small-flush-2">
				<li>
					<input type="text" name="text-group-3" id="text-group-3" placeholder="A placeholder value">
				</li>
				<li>
					<input type="text" name="text-group-4" id="text-group-4" placeholder="A placeholder value" class="error">
					<span class="error-text">Required</span>
				</li>
			</ul>
		</div>
		<div>
			<span class="label">Three inputs, split: 1/3</span>
			<ul class="fields-split base-block-grid-24 tablet-small-block-grid-8 tablet-small-flush-3">
				<li>
					<input type="text" name="text-group-3" id="text-group-3" placeholder="A placeholder value">
				</li>
				<li>
					<input type="text" name="text-group-4" id="text-group-4" placeholder="A placeholder value">
				</li>
				<li>
					<input type="text" name="text-group-3" id="text-group-3" placeholder="A placeholder value">
				</li>
			</ul>
		</div>
		<div>
			<label for="text-disabled">Text (disabled)</label>
			<input type="text" name="text-disabled" id="text-disabled" disabled>
		</div>
		<div>
			<label for="text-disabled-2">Text (failed validation)</label>
			<input type="text" name="text-disabled" id="text-disabled-2" class="required error" required>
			<span class="error-text">Name Required</span>
		</div>
		<div>
			<label for="text-disabled-3">Text (passed validation)</label>
			<input type="text" name="text-disabled" id="text-disabled-3" class="required success" required>
		</div>
		<div>
			<label for="email">Email</label>
			<input type="email" name="email" id="email">
		</div>
		<div>
			<label for="date">Date</label>
			<input type="date" name="date" id="date">
		</div>
		<div>
			<label for="search">Search</label>
			<input type="search" name="search" id="search">
		</div>
		<div>
			<label for="telephone">Telephone</label>
			<input type="tel" name="telephone" id="telephone">
		</div>
		<div>
			<label for="textarea">Textarea</label>
			<textarea name="textarea" id="textarea" rows="10"></textarea>
		</div>
		<div>
			<label for="select">Select (for plugin version - need to enable in main.js)</label>
			<select name="select" id="select">
				<option>Option 1</option>
				<option>Option 2</option>
				<option>Option 3</option>
				<option>Option 4</option>
				<option>Option 5</option>
				<option>Option 6</option>
				<option>Option 7</option>
				<option>Option 8</option>
				<option>Option 9</option>
				<option>Option 10</option>
				<option>Option 11</option>
				<option>Option 12</option>
				<option>Option 13</option>
				<option>Option 14</option>
				<optgroup label="Optgroup">
					<option>Option A</option>
					<option>Option B</option>
				</optgroup>
			</select>
		</div>
		<div>
			<label for="select">Select (multiple)</label>
			<select name="select" id="select" multiple="multiple" size="5">
				<option>Option 1</option>
				<option>Option 2</option>
				<option>Option 3</option>
				<option>Option 4</option>
				<option>Option 5</option>
				<option>Option 6</option>
				<option>Option 7</option>
				<option>Option 8</option>
				<option>Option 9</option>
				<option>Option 10</option>
			</select>
		</div>
		<div>
			<span class="label">Checkbox List</span>
			<ul class="fields-list-inline">
				<li>
					<input id="checkbox-1" type="checkbox" checked>
					<label for="checkbox-1">Option 1</label>
				</li>
				<li>
					<input id="checkbox-2" type="checkbox">
					<label for="checkbox-2">Option 2</label>
				</li>
				<li>
					<input id="checkbox-3" type="checkbox" class="error">
					<label for="checkbox-3">Option 3 error</label>
					<span class="error-text">This field is required</span>
				</li>
				<li>
					<input id="checkbox-4" type="checkbox" disabled>
					<label for="checkbox-4">Option Disabled</label>
				</li>
			</ul>
		</div>
		<div>
			<span class="label">Checkbox List</span>
			<ul class="fields-list-inline">
				<li>
					<input id="checkbox-1b" type="checkbox" checked>
					<label for="checkbox-1b">Option 1</label>
				</li>
				<li>
					<input id="checkbox-2b" type="checkbox">
					<label for="checkbox-2b">Option 2</label>
				</li>
				<li>
					<input id="checkbox-3b" type="checkbox" class="error">
					<label for="checkbox-3b">Option 3 error</label>
					<span class="error-text">This field is required</span>
				</li>
				<li>
					<input id="checkbox-4b" type="checkbox" disabled>
					<label for="checkbox-4b">Option Disabled</label>
				</li>
			</ul>
		</div>
		<div>
			<span class="label">Radio List</span>
			<ul class="fields-list">
				<li>
					<input id="radio-1" name="radio" type="radio" checked>
					<label for="radio-1">Option 1</label>
				</li>
				<li>
					<input id="radio-2" name="radio" type="radio">
					<label for="radio-2">Option 2</label>
				</li>
				<li>
					<input id="radio-3" name="radio" type="radio" class="error">
					<label for="radio-3">Option 3 error</label>
					<span class="error-text">This field is required</span>
				</li>
				<li>
					<input id="radio-4" name="radio" type="radio" disabled>
					<label for="radio-4">Option Disabled</label>
				</li>
			</ul>
		</div>
	</fieldset>
</form>