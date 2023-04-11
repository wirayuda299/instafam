import { ChangeEvent, FC } from 'react';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { z } from 'zod';
interface IProps {
	setPreviewUrl: React.Dispatch<React.SetStateAction<string>>;
	img: string | undefined;
}
const imageInputSchema = z.object({
	setPreviewUrl: z.function().args(z.any()).returns(z.any()),
	img: z.string(),
});

export const ImageInput: FC<IProps> = ({ setPreviewUrl, img }) => {
	const handleInputImage = async (e: ChangeEvent<HTMLInputElement>) => {
		try {
			const isValid = imageInputSchema.parse({ setPreviewUrl, img });
			if (!isValid)
				throw new Error(
					'Invalid data passed to ImageInput, please pass valid data such as string for image and function for setPreviewUrl'
				);
			let selectedFile = e.target.files?.[0];
			if (!selectedFile) return;
			const data = new FormData();
			data.append('image', selectedFile, selectedFile.name);

			const options = {
				method: 'POST',
				headers: {
					'X-RapidAPI-Key': process.env.X_RapidAPI_KEY ?? '',
					'X-RapidAPI-Host': process.env.X_RapidAPI_HOST ?? '',
				},
				body: data,
			};
			const getResult = await fetch(
				'https://nsfw-images-detection-and-classification.p.rapidapi.com/adult-content-file',
				options
			);
			const result = await getResult.json();

			const reader = new FileReader();
			reader.onload = async (event) => {
				if (event.target) {
					if (await result.unsafe) {
						alert(
							'Your uploaded image is contains adult content, please upload an image that does not contain adult content for the safety of our users.'
						);
						return;
					}

					return setPreviewUrl(event.target.result as string);
				}
			};
			reader.readAsDataURL(selectedFile);
		} catch (error: any) {
			console.log(error.message);
		}
	};
	return (
		<div
			className={` sm:min-w-[500px] items-center justify-center w-full ${
				img === '' ? 'flex' : 'hidden'
			}`}
		>
			<div className='max-w-xl w-full flex justify-center mx-auto'>
				<label
					htmlFor='dropzone-file'
					className='flex flex-col items-center justify-center w-full h-80 border-2 border-gray-300 rounded-lg cursor-pointer  hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600'
				>
					<div className='flex flex-col items-center justify-center pt-5 pb-6'>
						<AiOutlineCloudUpload className='w-12 h-12 text-gray-400' />
						<div className='mb-2 text-sm text-gray-500 dark:text-gray-400'>
							<span className='font-semibold block text-center'>
								Click to upload
							</span>
							<p className='text-xs text-gray-500 dark:text-gray-400'>
								PNG, JPG or any image extensions{' '}
							</p>
						</div>
					</div>
					<input
						id='dropzone-file'
						type='file'
						accept='video/*,image/*, .png, .jpg, .jpeg, .gif, .mp4, .mov, .webm'
						required
						className='hidden '
						onChange={async (e) => await handleInputImage(e)}
					/>
				</label>
			</div>
		</div>
	);
};
