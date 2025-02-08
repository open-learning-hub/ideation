import Pretitle from '@/ui/Pretitle'
import { PortableText, stegaClean } from 'next-sanity'
import Img from '@/ui/Img'
import { cn } from '@/lib/utils'

export default function FlagList({
	pretitle,
	intro,
	items,
	iconSize = 40,
	iconPosition,
}: Partial<{
	pretitle: string
	intro: any
	items: {
		icon: Sanity.Image
		content: any
	}[]
	iconSize: number
	iconPosition: 'top' | 'left'
}>) {
	return (
		<section className="section space-y-8">
			{(pretitle || intro) && (
				<header className="richtext mx-auto max-w-xl text-center text-balance">
					<Pretitle>{pretitle}</Pretitle>
					<PortableText value={intro} />
				</header>
			)}

			<div
				className="grid items-start gap-x-8 gap-y-6 md:grid-cols-[repeat(auto-fit,minmax(200px,1fr))]"
				style={
					{
						'--size': `${iconSize}px`,
					} as React.CSSProperties
				}
			>
				{items?.map((item, key) => (
					<article
						className={cn(
							'grid gap-4',
							stegaClean(iconPosition) === 'left' &&
								'grid-cols-[var(--size)_1fr]',
						)}
						key={key}
					>
						<figure>
							<Img
								className="aspect-square object-contain"
								image={item.icon}
								height={iconSize * 2}
								style={{ maxHeight: iconSize }}
							/>
						</figure>

						<div className="richtext">
							<PortableText value={item.content} />
						</div>
					</article>
				))}
			</div>
		</section>
	)
}
