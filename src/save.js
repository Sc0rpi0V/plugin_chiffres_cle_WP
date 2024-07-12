/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function save(props) {
	const { attributes: { title, titleFiligrane, subtitle, keyNumbers } } = props

	// Generate the front
	const keyNumbersDisplay = keyNumbers.map((keyNumber) => {
		return (
			<div data-id={ keyNumber.id}  className="key-number-item">
				<p className="key-number-number">{ keyNumber.number }</p>
				<p className="key-number-label">{ keyNumber.text }</p>
			</div>
		)
	} )

	return (
		<div { ...useBlockProps.save() } >
			<div className="wrapper-content">
				<div className="key-numbers-heading">
					{( title && title !== "" ?  <div className="key-numbers-title title title-med" data-filigrane={ titleFiligrane }><h2>{ title }</h2></div> : '' )}				
					{( subtitle && subtitle !== "" ?  <div className="key-numbers-subtitle subtitle"><p dangerouslySetInnerHTML={ { __html: subtitle } }></p></div> : '' )}
				</div>
				<div className="key-numbers-wrap list-key-numbers">{ keyNumbersDisplay }</div>
			</div>
		</div>
	);
}
