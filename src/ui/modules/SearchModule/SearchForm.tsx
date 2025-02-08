'use client'

import { useQuery, searchStore, handleSearch, type SearchScope } from './store'
import { cn, debounce, count } from '@/lib/utils'
import { stegaClean } from 'next-sanity'
import { VscSearch } from 'react-icons/vsc'
import resolveUrl from '@/lib/resolveUrl'
import css from './SearchForm.module.css'

/**
 * @note Remember to wrap this component in a Suspense
 */
export default function SearchForm({
	className,
	scope,
	...props
}: { scope?: SearchScope } & React.ComponentProps<'search'>) {
	const { query, setQuery } = useQuery()
	const { results, setResults } = searchStore()

	return (
		<search className={cn(css.root, 'relative', className)} {...props}>
			<label className="input focus-within:border-accent/50 relative z-[2] flex items-center gap-2 rounded">
				<VscSearch />

				<input
					className="grow outline-none"
					name="query"
					type="search"
					placeholder={
						stegaClean(scope) !== 'all' ? `Search ${scope}` : 'Search'
					}
					defaultValue={query}
					onChange={debounce((e) =>
						handleSearch({
							query: e.target.value,
							scope,
							setQuery,
							setResults,
						}),
					)}
				/>
			</label>

			{query && (
				<div
					className={cn(
						css.results,
						'anim-fade-to-b absolute inset-x-0 top-full z-[1]',
					)}
				>
					<div className="frosted-glass bg-canvas mt-1 max-h-[20em] overflow-y-auto rounded border border-neutral-200 shadow-md">
						<p className="text-ink/50 line-clamp-1 p-2 text-center text-sm">
							{count(results, 'result')} found for <output>"{query}"</output>
						</p>

						{results.length > 0 && (
							<ul className="px-3 pb-2">
								{results.map((result) => (
									<li key={result._id}>
										<a
											className="group flex gap-2 py-px"
											href={
												resolveUrl(result, { base: false }) +
												`#:~:text=${query}`
											}
										>
											<span className="line-clamp-1 grow group-hover:underline">
												{result.metadata.title}
											</span>

											<small className="technical text-accent/50 shrink-0 text-xs">
												{result._type === 'blog.post' ? 'Blog' : 'Page'}
											</small>
										</a>
									</li>
								))}
							</ul>
						)}
					</div>
				</div>
			)}
		</search>
	)
}
