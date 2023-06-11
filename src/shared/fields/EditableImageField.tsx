import React, {useState, useRef} from "react";
import {IconButton, Typography} from "@material-ui/core";

import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

import {getImageURL} from "../../DataProvider";
import {makeStyles} from "@material-ui/core/styles";
import {Upload} from 'mdi-material-ui';
import {Field, useField} from 'react-final-form';

const useStyles = makeStyles(theme => ({
    imageInput: {
        maxWidth: '256px'
    },
    imageContainer: {
        position: 'relative',
        display: 'block',
        width: '256px',
        minHeight: '50px',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    imageContainerImage: {
        width: '100%',
        display: 'block',
        borderRadius: '50%',
        backgroundColor: '#303030',
        padding: '5px'
    },
    imageContainerButton: {
        position: 'absolute',
        bottom: 0,
        right: 0
    },
    hidden: {
        display: 'none'
    }
}));


/**
 * This component renders the current image of a record, if it has one. On top of this, it
 * renders a small upload button at the bottom right corner of the image in order to change
 * the record's image. For this, the new image gets loaded with the ReactCrop component.
 *
 * @param record is the record from the datagrid.
 * @param source is the source name for the image.
 * @param props are the remaining parent-level properties,
 */
export const EditableImage = ({record, source, ...props}) => {

    const classes = useStyles();
    const {input: {onChange}} = useField(source);

    // Contains the reference to the original image (objectURL)
    const imageRef = useRef<HTMLImageElement|null>(null);

    const [state, setState] = useState<any>({
        // Contains the new (non-cropped) image
        src: null,
        // Contains the reference to the cropped image (objectURL)
        croppedImageUrl: undefined,
        // Contains the actual cropped image blob
        blob: undefined,
        // Settings for the ReactCrop component. We want square images, so we set the aspect ratio to 1
        crop: {
            unit: '%',
            height: 100,
            aspect: 1,
        }
    });

    /**
     * Gets called when a file gets selected in the upload dialog. Sets the "src" property on the state object.
     * @param e
     */
    const onSelectFile = e => {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            reader.addEventListener('load', () =>
                setState(prevState => ({
                    ...prevState,
                    src: reader.result
                }))
            );
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    /**
     * Gets called when the image has been loaded
     */
    const onImageLoaded = image => {
        imageRef.current = image;
    };

    /**
     * Gets called each time the crop's changes are done (crop window released)
     */
    const onCropComplete = (crop) => {
        makeClientCrop(imageRef.current, crop);
    };

    /**
     * Gets called each time the crop is changing (size, location, ...)
     */
    const onCropChange = (crop) => {
        setState(prevState => ({
            ...prevState,
            crop: crop
        }));
    };

    /**
     * Generates the cropped preview image
     */
    const makeClientCrop = async (imageRef, crop) => {
        if (imageRef && crop.width && crop.height) {
            const croppedImageUrl = await getCroppedImg(
                imageRef,
                crop,
                'newFile.png'
            );
            setState(prevState => ({
                ...prevState,
                croppedImageUrl: croppedImageUrl
            }));
        }
    };

    /**
     * Transforms the original image to a cropped copy by applying the cropping parameters
     */
    const getCroppedImg = (image, crop, fileName) => {
        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext('2d');

        if (ctx) {
            ctx.drawImage(
                image,
                crop.x * scaleX,
                crop.y * scaleY,
                crop.width * scaleX,
                crop.height * scaleY,
                0,
                0,
                crop.width,
                crop.height
            );
        }


        // Return promise with the new (cropped) image. For this, a new object URL gets created.
        // Furthermore, the image blob gets stored in the state object.
        return new Promise<void>((resolve, reject) => {
            canvas.toBlob(blob => {
                if (!blob) {
                    console.error('Canvas is empty');
                    return;
                }
                blob['name'] = fileName;
                let fileUrl = state.fileUrl;
                window.URL.revokeObjectURL(fileUrl);
                fileUrl = window.URL.createObjectURL(blob);
                setState(prevState => ({
                    ...prevState,
                    blob: blob,
                    fileUrl: fileUrl
                }));
                resolve(fileUrl);
            }, 'image/png');
        });
    };

    return (
        <div className={classes.imageInput}>
            {/*
            We need this react-final-form field because it handles the react-admin update process
            Each time the cropped image changes, the onChange() method gets called with the current image
            */}
            <Field name={source} component="input" onChange={onChange(state.blob)} className={classes.hidden}/>
            <div className={classes.imageContainer}>
                {/*Image preview*/}
                <ImagePreview record={record} state={state}/>

                {/*Hidden input for the image upload. We only accept png images*/}
                <input accept="image/png" className={classes.hidden} id="upload" type="file" onChange={onSelectFile}/>

                {/*Material design upload button*/}
                <label htmlFor="upload">
                    <IconButton color="primary" component="span" className={classes.imageContainerButton}>
                        <Upload/>
                    </IconButton>
                </label>
            </div>

            {/*When the image is selected and loaded, the ReactCrop component can be shown*/}
            {state.src && (
                <ReactCrop
                    src={state.src}
                    crop={state.crop}
                    ruleOfThirds
                    circularCrop
                    onImageLoaded={onImageLoaded}
                    onComplete={onCropComplete}
                    onChange={onCropChange}
                />
            )}
        </div>
    );
};

EditableImage.defaultProps = {addLabel: true};


const ImagePreview = (props) => {
    const classes = useStyles();
    let cropped = props.state.croppedImageUrl;
    let original = getImageURL(props.record);
    let src = cropped ? cropped : original;
    if (src) {
        return <img src={src} alt="Preview" className={classes.imageContainerImage}/>;
    }
    return <Typography>No image</Typography>;
};
