import styles from '../styles/dayplan.module.css'
import { useEffect, useState, Link } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import Image from 'next/image'
import { FiMapPin } from 'react-icons/fi'
import { IconContext } from 'react-icons'

export default function DayPlan() {
	const [dayPlan, setDayPlan] = useState([])

	const router = useRouter()
	const { cart } = router.query
	console.log(`This is your cart:`, cart)

		const postDayplan = async (input) => {
			const response = await fetch(
				`https://saunter-db.herokuapp.com/dayplans`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						"Access-Control-Request-Method": "POST",
					},
					body: JSON.stringify(input),
				}
			)
		}
	

	useEffect(() => {
		const getData = async () => {
			const response = await axios.get(
				`https://saunter-db.herokuapp.com/all-budgets`
			)
			let allActivities = response.data.data
			let filteredActivities = []
			for (let i = 0; i < cart.length; i++) {
				let activityId = cart[i]
				for (let i = 0; i < allActivities.length; i++) {
					if (allActivities[i].id == activityId) {
						filteredActivities.push(allActivities[i])
					}
				}
			}
			setDayPlan(filteredActivities)
			console.log(`your filtered activities:`, filteredActivities)
		}
		getData()
	}, [])

	const Card = ({ name, type, description, image, map }) => {
		return (
			<div className={styles.main_card}>
				<div className={styles.text_container}>
					<div className={styles.type_container}>
						<h5>{type}</h5>
					</div>
					<p>{description}</p>
					<div className={styles.iconbar}>
						<div className={styles.icon}>
							<IconContext.Provider
								value={{ color: 'black',
									size: '1.5rem'  }}
							>
								<div className={styles.maplink2}>
								<FiMapPin />
								<a className={styles.maplink} href={map} target="_blank" rel="noreferrer">View on Google Maps</a>
								</div>
							</IconContext.Provider>
						</div>
					</div>
				</div>
				<div className={styles.img_container}>
					<img src={image} alt={name} />
					<h2>{name}</h2>
				</div>
			</div>
		)
	}
	return (
		<div className={styles.dayplan}>
			<div className={styles.dayplancard}>
				<h1 className={styles.text}>Your perfect dayplan looks like this:</h1>
			</div>
			<div className={styles.all_cards}>
				{dayPlan.map((activity, index) => (
					<Card
						key={index}
						name={activity.name}
						type={activity.type}
						description={activity.description}
						image={activity.image}
						map={activity.map}
					/>
				))}
			</div>
			<div className={styles.button}>
			<button className='btn' onClick={function () {
				const dayplanName = prompt("Name your day plan:");
	
				const body = {name: dayplanName, activities: cart.toString()}
				console.log(body)
              return postDayplan(body);
            }}>
			Save Day Plan
			</button>
			</div>
		</div>
	)
}
