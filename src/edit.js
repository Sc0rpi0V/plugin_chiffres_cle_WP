/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the className name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import { InspectorControls,MediaUpload, useBlockProps, RichText } from '@wordpress/block-editor';

import { Button, PanelHeader, CheckboxControl, TextareaControl } from '@wordpress/components';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit(props) {
	const { attributes: { title, category, keyNumbers, keyNumbersLeft }, setAttributes } = props

	/**
	 * Update object keynumber on array keynumbers
	 *
	 * @param keynumber keynumber we want to update
	 * @param object the updated field
	 * @return newKeyNumber the updated keynumbers array
	 */
	const updateAttributes = (keyNumber, object) => {
		const newKeyNumber = Object.assign({}, keyNumber, object)
		// Remove the keynumber on array to replace with the new one
		const newKeyNumbers = [
			...keyNumbers.filter(
				item => item.id !== keyNumber.id
			),
			newKeyNumber
		]
		// Sort ASC the array on id
		return newKeyNumbers.sort(( a,b ) => {return (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0)})
	}
	/**
	 * Add keynumber to array keynumbers
	 * @return newKeyNumbers the updated keynumbers array
	 */
	const addKeyNumber = () => {
		const newKeyNumbers = (keyNumbers) ? [...keyNumbers] : []
		const id = (keyNumbers && keyNumbers.length > 0)
			? keyNumbers.reduce((acc, keyNumber) => acc = acc > keyNumber.id ? acc : keyNumber.id, 0) + 1
			: 0
		newKeyNumbers.push({
			id,
			text: '',
			number: '',
			image: ''
		})
		return newKeyNumbers
	}
	// Init the module with 1 key number
	if (keyNumbers.length === 0) {
		setAttributes({ keyNumbers: addKeyNumber() })
	}
		/**
	 * Remove keynumber from array keynumbers
	 * @param keyNumber keynumber we want to remove
	 * @return the updated keynumbers array
	 */
		 const deleteKeyNumber = (keyNumber) => {
			return [
				...keyNumbers.filter(
					item => item.id !== keyNumber.id
				)
			]
		}

		const renderMediaButton = (keyNumber,open) => {
			const addImageButton =
				<Button
					isPrimary
					onClick={ open }
					style={{
						marginBottom: '8px',
						marginRight: '4px'
					}}
				>
					{ (keyNumber.image) ? __('Remplacer Image', 'gutenberg_admin') : __('Mettre une Image', 'gutenberg_admin') }
				</Button>
			const removeImageButton =
				<Button
					isDestructive
					className="remove-image"
					label={__('Retirer l\'image', 'gutenberg_admin') }
					onClick={ () => setAttributes({ keyNumbers: updateAttributes(keyNumber, { image: '' }) }) }
					style={{
						marginBottom: '8px'
					}}
				>
					{ __('Supprimer', 'gutenberg_admin')}
				</Button>

			return (
				<div>
					{ addImageButton }
					{ (keyNumber.image) ? removeImageButton : '' }
				</div>
			)
		}

	// Left Side

	const updateAttributesLeft = (keyNumber, object) => {
		const newKeyNumber = Object.assign({}, keyNumber, object)
		// Remove the keynumber on array to replace with the new one
		const newKeyNumbers = [
			...keyNumbersLeft.filter(
				item => item.id !== keyNumber.id
			),
			newKeyNumber
		]
		// Sort ASC the array on id
		return newKeyNumbers.sort(( a,b ) => {return (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0)})
	}

	const addKeyNumberLeft = () => {
		const newKeyNumbersLeft = (keyNumbersLeft) ? [...keyNumbersLeft] : []
		const id = (keyNumbersLeft && keyNumbersLeft.length > 0)
			? keyNumbersLeft.reduce((acc, keyNumberLeft) => acc = acc > keyNumberLeft.id ? acc : keyNumberLeft.id, 0) + 1
			: 0
		newKeyNumbersLeft.push({
			id,
			text: '',
			number: '',
			image: ''
		})
		return newKeyNumbersLeft
	}
	// Init the module with 1 key number
	if (keyNumbersLeft.length === 0) {
		setAttributes({ keyNumbersLeft: addKeyNumberLeft() })
	}
	/**
	 * Remove keynumber from array keynumbers
	 * @param keyNumber keynumber we want to remove
	 * @return the updated keynumbers array
	 */
	const deleteKeyNumberLeft = (keyNumber) => {
		return [
			...keyNumbersLeft.filter(
				item => item.id !== keyNumber.id
			)
		]
	}

	const renderMediaButtonLeft = (keyNumberLeft,open) => {
		const addImageButton =
			<Button
				isPrimary
				onClick={ open }
				style={{
					marginBottom: '8px',
					marginRight: '4px'
				}}
			>
				{ (keyNumberLeft.image) ? __('Remplacer Image', 'gutenberg_admin') : __('Mettre une Image', 'gutenberg_admin') }
			</Button>
		const removeImageButton =
			<Button
				isDestructive
				className="remove-image"
				label={__('Retirer l\'image', 'gutenberg_admin') }
				onClick={ () => setAttributes({ keyNumbersLeft: updateAttributesLeft(keyNumberLeft, { image: '' }) }) }
				style={{
					marginBottom: '8px'
				}}
			>
				{ __('Supprimer', 'gutenberg_admin')}
			</Button>

		return (
			<div>
				{ addImageButton }
				{ (keyNumberLeft.image) ? removeImageButton : '' }
			</div>
		)
	}

	// Generate the render for attributes field
	const keyNumberFields = keyNumbers.map((keyNumber) => {
		let image_url = ""
     if ( keyNumber.image !== undefined  && keyNumber.image.url !== undefined )
    {
      image_url = keyNumber.image.url
      if ( keyNumber.image.sizes !== undefined && keyNumber.image.sizes.thumbnail !== undefined )
      {
        image_url = keyNumber.image.sizes.thumbnail.url
      }
    }
		return (

			<div data-id={keyNumber.id} className="key-number-item" >
				<div className="icon-number">
					<div className="image">
						<img src={image_url} />
					</div>
					<MediaUpload
					allowedTypes={ ['image'] }
					value={ keyNumber.image }
					onSelect={ (image) => setAttributes({ keyNumbers: updateAttributes( keyNumber, { image }) }) }
					render={ ( { open } ) => { return renderMediaButton(keyNumber, open) } }
					/>
				</div>
				<div className="details-key-number">
					<RichText
						tagName="p"
						className="key-number-number"
						placeholder={__('Chiffre clé', 'gutenberg_admin')}
						value={keyNumber.number}
						onChange={(number) => setAttributes({ keyNumbers: updateAttributes(keyNumber, { number }) })}
					/>
					<RichText
						tagName="p"
						className="key-number-text"
						placeholder={__('Label chiffre clé', 'gutenberg_admin')}
						value={(keyNumber.text)}
						onChange={(text) => setAttributes({ keyNumbers: updateAttributes(keyNumber, { text }) })}
					/>
					{(keyNumbers.length > 1) ? (
						<Button
							isDestructive
							className="remove-key-number"
							icon="no-alt"
							onClick={() => { setAttributes({ keyNumbers: deleteKeyNumber( keyNumber) }) }}
						>
							{__('Retirer le chiffre clé', 'gutenberg_admin')}
						</Button>
					) : ''}
				</div>
			</div>

		)
	})
	const keyNumberFieldsLeft = keyNumbersLeft.map((keyNumberLeft) => {
		let image_url = ""
     if ( keyNumberLeft.image !== undefined  && keyNumberLeft.image.url !== undefined )
    {
      image_url = keyNumberLeft.image.url
      if ( keyNumberLeft.image.sizes !== undefined && keyNumberLeft.image.sizes.thumbnail !== undefined )
      {
        image_url = keyNumberLeft.image.sizes.thumbnail.url
      }
    }
		return (

			<div data-id={keyNumberLeft.id} className="key-number-item-left" >
				<div className="icon-number-left">
					<div className="image-left">
						<img src={image_url} />
					</div>
					<MediaUpload
					allowedTypes={ ['image'] }
					value={ keyNumberLeft.image }
					onSelect={ (image) => setAttributes({ keyNumbersLeft: updateAttributesLeft( keyNumberLeft, { image }) }) }
					render={ ( { open } ) => { return renderMediaButtonLeft(keyNumberLeft, open) } }
					/>
				</div>
				<div className="details-number">
						<RichText
							tagName="p"
							className="key-number-number-left"
							placeholder={__('Chiffre clé', 'gutenberg_admin')}
							value={keyNumberLeft.number}
							onChange={(number) => setAttributes({ keyNumbersLeft: updateAttributesLeft(keyNumberLeft, { number }) })}
						/>
						<RichText
							tagName="p"
							className="key-number-text-left"
							placeholder={__('Label chiffre clé', 'gutenberg_admin')}
							value={(keyNumberLeft.text)}
							onChange={(text) => setAttributes({ keyNumbersLeft: updateAttributesLeft(keyNumberLeft, { text }) })}
						/>
						{(keyNumbersLeft.length > 1) ? (
							<Button
								isDestructive
								className="remove-key-number-left"
								icon="no-alt"
								onClick={() => { setAttributes({ keyNumbersLeft: deleteKeyNumberLeft( keyNumberLeft) }) }}
							>
								{__('Retirer le chiffre clé', 'gutenberg_admin')}
							</Button>
						) : ''}
				</div>
			</div>

		)
	})

	const keyNumberHeaderDisplay = <div className="key-numbers-heading">
		<RichText
			tagName="span"
			className="key-numbers-title-category category"
			placeholder={__('Entrer une catégorie', 'gutenberg_admin')}
			value={category}
			onChange={(category) => setAttributes({ category })}
		/>
		<RichText
			tagName="h2"
			className="key-numbers-title title title-med"
			placeholder={__('Entrer un titre', 'gutenberg_admin')}
			value={title}
			onChange={(title) => setAttributes({ title })}
		/>
	</div>

	return [
		<InspectorControls>
			<PanelHeader>
				<Button
					isPrimary
					className="is-aligned-center"
					icon="plus"
					onClick={() => { setAttributes({ keyNumbersLeft: addKeyNumberLeft() }) }}
					style={{
						width: '100%'
					}}
				>
					{__('Ajouter un chiffre clé à gauche', 'gutenberg_admin')}
				</Button>
			</PanelHeader>
			<PanelHeader>
				<Button
					isPrimary
					className="is-aligned-center"
					icon="plus"
					onClick={() => { setAttributes({ keyNumbers: addKeyNumber() }) }}
					style={{
						width: '100%'
					}}
				>
					{__('Ajouter un chiffre clé à droite', 'gutenberg_admin')}
				</Button>
			</PanelHeader>
		</InspectorControls>
		,
		<div {...useBlockProps()}>
			<div className="wrapper-content">
				{keyNumberHeaderDisplay}
				<div className='left'>
					<div className="key-numbers-wrap-left list-key-numbers-left">{keyNumberFieldsLeft}</div>
				</div>
				<div className='right'>
					<div className="key-numbers-wrap list-key-numbers">{keyNumberFields}</div>
				</div>
			</div>
		</div>
	]
}
