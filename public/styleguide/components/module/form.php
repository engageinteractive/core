<form>
	<fieldset class="row row--compact flush-first--1">
		<div class="column">
			<label class="label" for="form-example-text">Text</label>

			<input type="text" name="form-example-text" id="form-example-text">
		</div>

		<div class="column">
			<label class="label" for="form-example-text-value">Text (with value)</label>

			<input type="text" name="form-example-text-value" id="form-example-text-value" value="A test value">
		</div>

		<div class="column">
			<label class="label" for="form-example-text-required">Text (required)</label>

			<input type="text" name="form-example-text-required" id="form-example-text-required" required>
		</div>

		<div class="column">
			<label class="label" for="form-example-text-placeholder">Text (with placeholder)</label>

			<input type="text" name="form-example-text-placeholder" id="form-example-text-placeholder" placeholder="A placeholder value">
		</div>

		<div class="column">
			<span class="label">Two inputs</span>

			<ul class="fields-list">
				<li>
					<input type="text" name="form-example-text-group-1" id="form-example-text-group-1" placeholder="A placeholder value">
				</li>

				<li>
					<input type="text" name="form-example-text-group-2" id="form-example-text-group-2" placeholder="A placeholder value" class="is-invalid">

					<span class="error-text">Required</span>
				</li>
			</ul>
		</div>

		<div class="column">
			<label class="label" for="form-example-text-disabled">Text (disabled)</label>

			<input type="text" name="form-example-text-disabled" id="form-example-text-disabled" disabled>
		</div>

		<div class="column">
			<label class="label" for="form-example-text-disabled-2">Text (failed validation)</label>

			<input type="text" name="form-example-text-disabled-2" id="form-example-text-disabled-2" class="is-invalid" required>

			<span class="error-text">Name Required</span>
		</div>

		<div class="column">
			<label class="label" for="form-example-text-disabled-3">Text (passed validation)</label>

			<input type="text" name="form-example-text-disabled-3" id="form-example-text-disabled-3" class="is-valid" required>
		</div>

		<div class="column">
			<label class="label" for="form-example-email">Email</label>

			<input type="email" name="form-example-email" id="form-example-email">
		</div>

		<div class="column">
			<label class="label" for="form-example-date">Date</label>

			<input type="date" name="form-example-date" id="form-example-date">
		</div>

		<div class="column">
			<label class="label" for="form-search">Search</label>

			<input type="search" name="form-search" id="form-search">
		</div>

		<div class="column">
			<label class="label" for="form-example-telephone">Telephone</label>

			<input type="tel" name="form-example-telephone" id="form-example-telephone">
		</div>

		<div class="column">
			<label class="label" for="form-example-number">Number</label>

			<input type="number" name="form-example-number" id="form-example-number">
		</div>

		<div class="column">
			<label class="label" for="form-example-textarea">Textarea</label>

			<textarea name="form-example-textarea" id="form-example-textarea" rows="10"></textarea>
		</div>

		<div class="column">
			<label class="label" for="form-example-select-unstyled">Select (unstyled)</label>

			<select name="form-example-select-unstyled" id="form-example-select-unstyled">
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

		<div class="column">
			<label class="label" for="form-example-select-styled">Select (styled, with custom arrow)</label>

			<div class="select">
				<select name="form-example-select-styled" id="form-example-select-styled">
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

		<div class="column">
			<button type="reset" class="button">RESET</button>
		</div>

		<div class="column">
			<label class="label" for="form-example-select-multiple">Select (multiple)</label>

			<select name="form-example-select-multiple" id="form-example-select-multiple" multiple="multiple" size="5" class="valid">
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

		<div class="column">
			<span class="label">Checkbox List</span>

			<ul class="fields-list-inline">
				<li>
					<input id="form-example-checkbox-1b" type="checkbox" class="checkbox" checked>
					<label class="label" for="form-example-checkbox-1b">Option 1</label>
				</li>

				<li>
					<input id="form-example-checkbox-2b" type="checkbox" class="checkbox">
					<label class="label" for="form-example-checkbox-2b">Option 2</label>
				</li>

				<li>
					<input id="form-example-checkbox-3b" type="checkbox" class="checkbox" class="is-invalid">
					<label class="label" for="form-example-checkbox-3b">Option 3 error</label>
				</li>

				<li>
					<input id="form-example-checkbox-4b" type="checkbox" class="checkbox" disabled>
					<label class="label" for="form-example-checkbox-4b">Option Disabled</label>
				</li>
			</ul>
		</div>

		<div class="column">
			<span class="label">Radio List</span>

			<ul class="fields-list">
				<li>
					<input id="form-example-radio-1" name="radio" type="radio" class="radio" checked>
					<label class="label" for="form-example-radio-1">Option 1</label>
				</li>

				<li>
					<input id="form-example-radio-2" name="radio" type="radio" class="radio">
					<label class="label" for="form-example-radio-2">Option 2</label>
				</li>

				<li>
					<input id="form-example-radio-3" name="radio" type="radio" class="radio" class="is-invalid">
					<label class="label" for="form-example-radio-3">Option 3 error</label>
				</li>

				<li>
					<input id="form-example-radio-4" name="radio" type="radio" class="radio" disabled>
					<label class="label" for="form-example-radio-4">Option Disabled</label>
				</li>
			</ul>
		</div>
	</fieldset>
</form>