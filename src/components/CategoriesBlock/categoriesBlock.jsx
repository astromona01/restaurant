import '../../styles/header.css';
import { useState, useEffect } from 'react';

const CategoriesBlock = () => {

		const [scrolled, setScrolled] = useState(false)
		const [currentBlock, setCurrentBlock] = useState('')

		useEffect(() => {
				window.onscroll = (e) => {
						scrollActive()
						if (window.pageYOffset <= 372) {
								setScrolled(false)
						} else {
								setScrolled(true)
						}
				}
		})

		const scrollActive = () => {
				const windowTop = window.pageYOffset;
				const blocks = getCategoriesBlocks();
				if (blocks.burgersBlock){
						const burgersTop = blocks.burgersBlock.getBoundingClientRect().top + windowTop-1
						const twistersTop = blocks.twistersBlock.getBoundingClientRect().top + windowTop-1
						const chickenTop = blocks.chickenBlock.getBoundingClientRect().top + windowTop-1
						const basketsTop = blocks.basketsBlock.getBoundingClientRect().top + windowTop-1
						const snacksTop = blocks.snacksBlock.getBoundingClientRect().top + windowTop-1
						const sousesTop = blocks.sousesBlock.getBoundingClientRect().top + windowTop-1
						const drinksTop = blocks.drinksBlock.getBoundingClientRect().top + windowTop-1
						const coffeeTop = blocks.coffeeBlock.getBoundingClientRect().top + windowTop-1
						const desertsTop = blocks.desertsBlock.getBoundingClientRect().top + windowTop-1
						const hitsTop = blocks.hitsBlock.getBoundingClientRect().top + windowTop-1
						if (windowTop >= burgersTop && windowTop < twistersTop) {
								setCurrentBlock('Burgers')
						}else if(windowTop >= twistersTop && windowTop < chickenTop) {
								setCurrentBlock('Twisters')
						} else if (windowTop >= chickenTop && windowTop < basketsTop) {
								setCurrentBlock('Chicken')
						} else if (windowTop >= basketsTop && windowTop < snacksTop) {
								setCurrentBlock('Baskets')
						} else if (windowTop >= snacksTop && windowTop < sousesTop) {
								setCurrentBlock('Snacks')
						} else if (windowTop >= sousesTop && windowTop < drinksTop) {
								setCurrentBlock('Souses')
						} else if (windowTop >= drinksTop && windowTop < coffeeTop) {
								setCurrentBlock('Drinks')
						} else if (windowTop >= coffeeTop && windowTop < desertsTop) {
								setCurrentBlock('Coffee-tea')
						} else if (windowTop >= desertsTop && windowTop < hitsTop) {
								setCurrentBlock('Deserts')
						} else if (windowTop >= hitsTop) {
								setCurrentBlock('Hits')
						} else {
								setCurrentBlock('')
						}
				}
		}
		const getCategoriesBlocks = () => {
				const burgersBlock = document.querySelector('.Burgers')
				const twistersBlock = document.querySelector('.Twisters')
				const chickenBlock = document.querySelector('.Chicken')
				const basketsBlock = document.querySelector('.Baskets')
				const snacksBlock = document.querySelector('.Snacks')
				const sousesBlock = document.querySelector('.Souses')
				const drinksBlock = document.querySelector('.Drinks')
				const coffeeBlock = document.querySelector('.Coffee-tea')
				const desertsBlock = document.querySelector('.Deserts')
				const hitsBlock = document.querySelector('.Hits')
				return {
						burgersBlock,
						twistersBlock,
						chickenBlock,
						basketsBlock,
						snacksBlock,
						sousesBlock,
						drinksBlock,
						coffeeBlock,
						desertsBlock,
						hitsBlock
				}
		}

		const scrollToBlock = (e) => {
				e.preventDefault()
				const blockCLass = e.target.getAttribute('href').substr(1)
				document.querySelector(`.${blockCLass}`).scrollIntoView({
						behavior: 'smooth',
						block: 'start'
				})
		}

		return (
				<ul className={`${scrolled ? 'sticky' : ''} categories-list`}>
						<li className={currentBlock==='Burgers' ? 'current-scroll' : ''}>
								<a href={".Burgers"} onClick={scrollToBlock}>Бургеры</a>
						</li>
						<li className={currentBlock==='Twisters' ? 'current-scroll' : ''}>
								<a href={".Twisters"} onClick={scrollToBlock}>Твистеры</a>
						</li>
						<li className={currentBlock==='Chicken' ? 'current-scroll' : ''}>
								<a href={".Chicken"} onClick={scrollToBlock}>Курица</a>
						</li>
						<li className={currentBlock==='Baskets' ? 'current-scroll' : ''}>
								<a href={".Baskets"} onClick={scrollToBlock}>Баскеты</a>
						</li>
						<li className={currentBlock==='Snacks' ? 'current-scroll' : ''}>
								<a href={".Snacks"} onClick={scrollToBlock}>Снэки</a>
						</li>
						<li className={currentBlock==='Souses' ? 'current-scroll' : ''}>
								<a href={".Souses"} onClick={scrollToBlock}>Соусы</a>
						</li>
						<li className={currentBlock==='Drinks' ? 'current-scroll' : ''}>
								<a href={".Drinks"} onClick={scrollToBlock}>Напитки</a>
						</li>
						<li className={currentBlock==='Coffee-tea' ? 'current-scroll' : ''}>
								<a href={".Coffee-tea"} onClick={scrollToBlock}>Кофе и чай</a>
						</li>
						<li className={currentBlock==='Deserts' ? 'current-scroll' : ''}>
								<a href={".Deserts"} onClick={scrollToBlock}>Десерты</a>
						</li>
						<li className={currentBlock==='Hits' ? 'current-scroll' : ''}>
								<a href={".Hits"} onClick={scrollToBlock}>Хиты по 50</a>
						</li>
				</ul>
		)
}
export default CategoriesBlock;