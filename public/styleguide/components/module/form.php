<form>
	<fieldset class="fields-group">
		<div class="form-field">
			<label for="text">Text</label>
			<input type="text" name="text" id="text">
		</div>
		<div class="form-field">
			<label for="text-value">Text (with value)</label>
			<input type="text" name="text-value" id="text-value" value="A test value">
		</div>
		<div class="form-field">
			<label for="text-required">Text (required)</label>
			<input type="text" name="text-required" id="text-required" required>
		</div>
		<div class="form-field">
			<label for="text-placeholder">Text (with placeholder)</label>
			<input type="text" name="text-placeholder" id="text-placeholder" placeholder="A placeholder value">
		</div>
		<div class="form-field">
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
		<div class="form-field">
			<label for="text-disabled">Text (disabled)</label>
			<input type="text" name="text-disabled" id="text-disabled" disabled>
		</div>
		<div class="form-field">
			<label for="text-disabled-2">Text (failed validation)</label>
			<input type="text" name="text-disabled" id="text-disabled-2" class="error" required>
			<span class="error-text">Name Required</span>
		</div>
		<div class="form-field">
			<label for="text-disabled-3">Text (passed validation)</label>
			<input type="text" name="text-disabled" id="text-disabled-3" class="valid" required>
		</div>
		<div class="form-field">
			<label for="email">Email</label>
			<input type="email" name="email" id="email">
		</div>
		<div class="form-field">
			<label for="date">Date</label>
			<input type="date" name="date" id="date">
		</div>
		<div class="form-field">
			<label for="search">Search</label>
			<input type="search" name="search" id="search">
		</div>
		<div class="form-field">
			<label for="telephone">Telephone</label>
			<input type="tel" name="telephone" id="telephone">
		</div>
		<div class="form-field">
			<label for="textarea">Textarea</label>
			<textarea name="textarea" id="textarea" rows="10"></textarea>
		</div>
		<div class="form-field">
			<label for="select-unstyled">Select (unstyled)</label>
			<select name="select-unstyled" id="select-unstyled">
				<option>Option 1</option>
				<option>Option 2</option>
				<option>Option 3</option>
				<option>Option 4</option>
				<option>Option 5</option>
				<optgroup label="Optgroup">
					<option>Option A</option>
					<option>Option B</option>
				</optgroup>
			</select>
		</div>
		<div class="form-field">
			<label for="select-styled">Select (styled, with custom arrow)</label>
			<div class="select">
				<select name="select-styled" id="select-styled">
					<option>Option 1</option>
					<option>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea tempore sint adipisci maiores explicabo obcaecati ipsa ex magnam, nostrum, quasi dolor nihil ipsam quaerat vitae saepe alias tempora, veritatis similique!</option>
					<option>Option 3</option>
					<option>Option 4</option>
					<option>Option 5</option>
					<optgroup label="Optgroup">
						<option>Option A</option>
						<option>Option B</option>
					</optgroup>
				</select>
			</div>
		</div>
		<div class="form-field">
			<button type="reset" class="button">RESET</button>
		</div>
		<div class="form-field">
			<label for="select">Select (multiple)</label>
			<select name="select" id="select" multiple="multiple" size="5" class="valid">
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
		<div class="form-field">
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
				</li>
				<li>
					<input id="checkbox-4b" type="checkbox" disabled>
					<label for="checkbox-4b">Option Disabled</label>
				</li>
			</ul>
		</div>
		<div class="form-field">
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
				</li>
				<li>
					<input id="radio-4" name="radio" type="radio" disabled>
					<label for="radio-4">Option Disabled</label>
				</li>
			</ul>
		</div>
	</fieldset>
</form>