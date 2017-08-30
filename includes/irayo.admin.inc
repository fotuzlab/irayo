<?php

/**
 * Implements hook_form().
 * Admin settings.
 */
function irayo_admin_settings() {
	$form = array();

	$form['irayo_api_key'] = array(
		  '#type' => 'textfield',
		  '#title' => t('Irayo API key'),
		  '#description' => t('Enter the API key to your Irayo account.'),
		  '#default_value' => IRAYO_API_KEY,
		);

	return system_settings_form($form);
}
