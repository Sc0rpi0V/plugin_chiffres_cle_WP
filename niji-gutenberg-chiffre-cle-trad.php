<?php
/**
 * Plugin Name:        Gutenberg Chiffre Cle - Trad Auto
 * Description:       Block Chiffre clés (compatible avec les traduction auto)
 * Requires at least: 5.7
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       gutenberg-chiffre-cle-trad
 *
 * @package           create-block
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/block-editor/tutorials/block-tutorial/writing-your-first-block-type/
 */
class GutenbergChiffreCleTrad {

	/**
	 * __construct
	 *
	 * @return void
	 */
	public function __construct() {
		/* register activation function */
		register_block_type_from_metadata(__DIR__, [
			'render_callback' => [
				__CLASS__,
				'block_dynamic_render',
			],
		]);
		add_filter('block_categories_all', [__CLASS__, 'gutenberg_category'], 10, 2);
	}

	/**
	 * init
	 *
	 * @return void
	 */
	public static function init() {
		new self;
	}

	/**
	 * Add category Gutenberg if not exist
	 *
	 * @param $categories
	 *
	 * @return array
	 */
	public static function gutenberg_category($categories) {
		if (!in_array([
			'slug' => 'gutenberg',
			'title' => __('Gutenberg Blocks', 'mario-blocks'),
		], $categories)) {
			$news = [
				'slug' => 'gutenberg',
				'title' => __('Gutenberg Blocks', 'mario-blocks'),
			];
			if (!in_array($news, $categories)) {
				return array_merge(
					[
						$news,
					],
					$categories
				);
			}
		}
		return $categories;
	}

	/**
	 * CALLBACK
	 *
	 * Render callback for the dynamic block.
	 *
	 * Instead of rendering from the block's save(), this callback will render
	 * the front-end
	 *
	 * @param $att Attributes from the JS block
	 *
	 * @return string Rendered HTML
	 * @since    1.0.0
	 */
	public static function block_dynamic_render($att) {
		extract($att);

		$html = "";

		$html .= '<div class="wp-block-create-block--gutenberg-chiffre-cle">';
		$html .= '<div class="wrapper-content">';

		$html .= '<div class="left">';
		$html .= '<div class="key-numbers-heading">';
		if (isset($title) && $title) {
			$html .= '<div class="key-numbers-title title title-category"><h2><span>' . $category . '</span>' . $title . '</h2></div>';
		}
		$html .= '</div>';

		$html .= '<div class="key-numbers-wrap-left list-key-numbers-left">';
		foreach ($keyNumbersLeft as $keyNumber) :
			$html .= '<div data-id="' . $keyNumber["id"] . '" class="key-number-item-left">';
			$html .= '<div class="icon-number-left">';
			if (is_array($keyNumber["image"])) {
				if ($keyNumber["image"] !== NULL) {
					$image_src = $keyNumber["image"]["url"];
					$html .= "<div class='image-left'><img width='75' height='75' src='" . $image_src . "' /></div>";
				}
				else {
					$image_src = $image["url"];
					$html .= "<div class='image-left'><img width='75' height='75' src='" . $image_src . "' /></div>";
				}
			}
			$html .= '</div>';
			$html .= '<div class="details-number">';
			$html .= '<p class="key-number-number-left">' . $keyNumber["number"] . '</p>';
			$html .= '<p class="key-number-text-left">' . $keyNumber["text"] . '</p>';
			$html .= '</div>';
			$html .= '</div>';
		endforeach;
		$html .= '</div>';
		$html .= '</div>';

		$html .= '<div class="right">';
		$html .= '<div class="key-numbers-wrap list-key-numbers">';
		foreach ($keyNumbers as $keyNumber) :
			$html .= '<div data-id="' . $keyNumber["id"] . '" class="key-number-item">';
			$html .= '<div class="icon-number">';
			if (is_array($keyNumber["image"])) {
				if ($keyNumber["image"] !== NULL) {
					$image_src = $keyNumber["image"]["url"];
					$html .= "<div class='image'><img width='75' height='75' src='" . $image_src . "' /></div>";
				}
				else {
					$image_src = $image["url"];
					$html .= "<div class='image'><img width='75' height='75' src='" . $image_src . "' /></div>";
				}
			}
			$html .= '</div>';
			$html .= '<div class="details-key-number">';
			$html .= '<p class="key-number-number">' . $keyNumber["number"] . '</p>';
			$html .= '<p class="key-number-text">' . $keyNumber["text"] . '</p>';
			$html .= '</div>';
			$html .= '</div>';
		endforeach;
		$html .= '</div>';
		$html .= '</div>';
		$html .= '</div>';
		$html .= '</div>';

		return $html;
	}

}

add_action('init', ['GutenbergChiffreCleTrad', 'init']);
