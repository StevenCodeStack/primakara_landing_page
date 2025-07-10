import { ArrowLeft, ArrowRight } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { wrap } from 'motion'
import { loadTranslations } from '../../lib/i18n'

type Stories = {
	images: string
	name: string
	role: string
	story: string
	year: string
}

const Stories = ({ locale }: { locale: string }) => {
	const [stories, setStories] = useState<Stories[]>([])
	const [[page, direction], setPage] = useState([0, 0])

	const paginate = (newDirection: number) => {
		setPage([page + newDirection, newDirection])
	}

	useEffect(() => {
		loadTranslations(locale).then(({ stories }) => setStories(stories))
	}, [locale])

	if (stories.length === 0) return <div>Loading...</div>

	const imageIndex = wrap(0, stories.length, page)

	return (
		<div className="globalLayout">
			{/* Header */}
			<div className="flex items-center justify-between">
				<div className="w-full text-3xl font-semibold tracking-tight italic md:text-5xl">
					<h1>GREAT STORIES</h1>
					<h1 className="text-primary">FROM PRIMAKARA</h1>
				</div>
				<div className="flex items-center gap-3">
					<button
						onClick={() => paginate(-1)}
						className="bg-primary text-bg flex aspect-square h-10 items-center justify-center"
					>
						<ArrowLeft />
					</button>
					<h1 className="text-lg text-nowrap md:text-2xl">
						{imageIndex + 1} / {stories.length}
					</h1>
					<button
						onClick={() => paginate(1)}
						className="bg-primary text-bg flex aspect-square h-10 items-center justify-center"
					>
						<ArrowRight />
					</button>
				</div>
			</div>

			{/* Content */}
			<div className="bg-lighter-bg mt-10 flex flex-col justify-between overflow-hidden md:h-110 md:flex-row">
				{/* Image Section */}
				<div className="bg-primary relative h-80 overflow-hidden md:h-auto md:w-[40%]">
					<AnimatePresence initial={false} custom={direction}>
						<motion.img
							key={page}
							src={stories[imageIndex].images}
							custom={direction}
							initial={{ x: direction > 0 ? '90%' : '-90%' }}
							animate={{ x: 0, opacity: 1 }}
							exit={{ x: direction < 0 ? '90%' : '-90%' }}
							transition={{ type: 'tween', ease: 'easeInOut', duration: 0.5 }}
							className="absolute h-full w-full object-cover"
						/>
					</AnimatePresence>
				</div>

				{/* Text Section - Wrapped in AnimatePresence */}
				<div className="relative flex-grow overflow-hidden px-12 py-10 md:max-w-[60%]">
					<AnimatePresence initial={false} custom={direction}>
						<motion.div
							key={page}
							custom={direction}
							initial={{
								y: 50,
								opacity: 0
							}}
							animate={{
								y: 0,
								opacity: 1,
								transition: {
									delay: 0.3, // 300ms delay
									duration: 0.5
								}
							}}
							exit={{
								y: 50,
								opacity: 0
							}}
							transition={{
								type: 'tween',
								ease: 'easeInOut',
								duration: 0.5
							}}
							className="absolute inset-0 px-12 py-10"
						>
							<h1 className="text-primary text-5xl font-semibold italic">
								{stories[imageIndex].name}
							</h1>
							<h2 className="bg-primary text-bg mt-3 w-fit px-2 py-1 text-lg font-semibold italic">
								{stories[imageIndex].role}
							</h2>
							<p className="mt-5 text-xl">{stories[imageIndex].story}</p>
							<p className="mt-8 text-lg font-semibold text-slate-400">
								{stories[imageIndex].year}
							</p>
						</motion.div>
					</AnimatePresence>
				</div>
			</div>

			<button className="bg-primary border-bg text-secondary-bg mt-10 flex h-10 w-fit items-center border py-1 pr-1 md:h-12">
				<span className="px-4 font-semibold md:px-8 md:text-lg lg:text-xl">
					Mahasiswa Primakara
				</span>
				<ArrowRight className="bg-secondary-bg text-primary aspect-square h-full w-auto" />
			</button>
		</div>
	)
}

export default Stories
