import { useState, useRef } from "react";
import "./Swiping.css";
import { eventData } from "@/hook/events";
import { TbArrowBigUp, TbInfoCircle, TbUser } from "react-icons/tb";
import { LuThumbsDown, LuThumbsUp } from "react-icons/lu";
import { demoMatch, demoMatchTimer } from "@/hook/match";

const Home = () => {
	const [events, setEvents] = useState(eventData);
	const [selectedEvent, setSelectedEvent] = useState(null);
	const [swipedDirection, setSwipedDirection] = useState(null);

	const handleSwipe = (id, direction) => {
		if (direction === "right") {
			clearTimeout(demoMatchTimer.cur);
			demoMatchTimer.recentName = events.find((event) => event.id === id).title;
			demoMatchTimer.cur = setTimeout(() => {
				demoMatch();
			}, 3000);
		}

		console.log(`Swiped ${direction}: ${id}`);
		setSwipedDirection(direction);
		setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));

		setTimeout(() => {
			setSwipedDirection(null);
		}, 1000);
	};

	return (
		<div className="grid grid-cols-[2fr_1fr] gap-20 p-20">
			<div>
				<h1 className="text-3xl mb-5">
					Welcome to toGather! <span>🎉</span>
				</h1>
				<div>
					<label>toGather</label> is your go-to platform for finding friends to
					attend events with in your city. Whether you&apos;re looking for
					concert buddies, festival companions, or just someone to explore with,
					we make it easy to connect with like-minded people.
				</div>

				<h3 className="text-2xl mb-5 mt-6">
					<span>🔍</span> How It Works
				</h3>
				<ul>
					<li>
						<h3>Home</h3> Browse events happening near you and let us know your
						interest! Click the <strong>green thumbs up</strong> if you&apos;re
						in or the <strong>red thumbs down</strong> if you&apos;re not.
						We&apos;ll match you with others who share your interests.
					</li>
					<li>
						<h3>Chats</h3> Once you&apos;re matched, a{" "}
						<strong>group chat</strong> is automatically created for each event,
						so you can coordinate plans and get to know your event crew. Click
						on the other members to view their details!
					</li>
					<li>
						<h3>Profile</h3> Customize your profile, update your location, and
						set your event preferences to find the best matches.
					</li>
				</ul>

				<p className="mt-6">
					Ready to make new connections and experience events together?
					Let&apos;s get started! <span>🚀</span>
				</p>
			</div>
			<div>
				<div>
					{events.map((event) => (
						<SwipeableCard
							key={event.id}
							event={event}
							onSwipe={handleSwipe}
							onDoubleClick={() => setSelectedEvent(event)} // Open modal on double click
						/>
					))}
				</div>
				<div className="mt-120 flex flex-col items-center pr-8 opacity-50">
					<TbArrowBigUp />
					What do you think about this event?
				</div>
				{selectedEvent && (
					<EventModal
						event={selectedEvent}
						onClose={() => setSelectedEvent(null)}
					/>
				)}
				<div>
					{swipedDirection === "left" && <div>Dislike</div>}
					{swipedDirection === "right" && <div>Like</div>}
				</div>
			</div>
		</div>
	);
};

const SwipeableCard = ({ event, onSwipe, onDoubleClick }) => {
	const cardRef = useRef(null);
	let startX = 0;
	let currentX = 0;
	const swipeThreshold = 50; // 👈 Reduced swipe distance

	const getClientX = (e) => (e.touches ? e.touches[0].clientX : e.clientX);

	const onDragStart = (e) => {
		startX = getClientX(e);
	};

	const onDragMove = (e) => {
		if (!startX) return;
		currentX = getClientX(e) - startX;
		if (cardRef.current) {
			cardRef.current.style.transform = `translateX(${currentX}px) rotate(${
				currentX / 15
			}deg)`;
		}
	};

	const swipeRight = () => {
		cardRef.current.style.transform = "translateX(500px) rotate(20deg)";
		setTimeout(() => onSwipe(event.id, "right"), 200);
	};

	const swipeLeft = () => {
		cardRef.current.style.transform = "translateX(-500px) rotate(-20deg)";
		setTimeout(() => onSwipe(event.id, "left"), 200);
	};

	const onDragEnd = () => {
		if (!cardRef.current) return;

		if (currentX > swipeThreshold) {
			swipeRight();
		} else if (currentX < -swipeThreshold) {
			swipeLeft();
		} else {
			cardRef.current.style.transform = "translateX(0px) rotate(0deg)";
		}

		startX = 0;
		currentX = 0;
	};

	return (
		<div
			className="event-card select-none"
			ref={cardRef}
			onMouseDown={onDragStart}
			onMouseMove={onDragMove}
			onMouseUp={onDragEnd}
			onMouseLeave={onDragEnd}
			onTouchStart={onDragStart}
			onTouchMove={onDragMove}
			onTouchEnd={onDragEnd}
		>
			<div
				className="event-image text-white p-3 relative overflow-hidden"
				draggable={false}
				style={{
					backgroundImage: `url(${event.image})`,
					backgroundSize: "cover",
				}}
			>
				<div
					className="gradient-overlay"
					style={{
						zIndex: 0,
						background:
							"linear-gradient(to bottom, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0))",
						position: "absolute",
						top: 0,
						left: 0,
						right: 0,
						height: "30%",
					}}
				>
					<div className="absolute flex top-3 left-3">
						{event.age}{" "}
						<div className="ml-5 flex">
							<TbUser /> {event.attendees}
						</div>
					</div>
					<div
						className="absolute text-2xl top-3 right-3"
						onClick={onDoubleClick}
					>
						<TbInfoCircle />
					</div>
				</div>
				<div
					className="gradient-overlay"
					style={{
						zIndex: 0,
						background:
							"linear-gradient(to top, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0))",
						position: "absolute",
						bottom: 0,
						left: 0,
						right: 0,
						height: "50%",
					}}
				>
					<h3 className="text-3xl absolute bottom-3 left-3">{event.title}</h3>
				</div>
			</div>
			<div>
				<p className="line-clamp-3">{event.description}</p>
			</div>
			<div className="flex gap-5 mt-3">
				<div onClick={swipeLeft} className="rate dislike">
					<LuThumbsDown />
				</div>
				<div onClick={swipeRight} className="rate like">
					<LuThumbsUp />
				</div>
			</div>
		</div>
	);
};

const EventModal = ({ event, onClose }) => {
	return (
		<div className="modal-overlay" onClick={onClose}>
			<div className="modal-content" onClick={(e) => e.stopPropagation()}>
				<button className="close-button" onClick={onClose}>
					✖
				</button>
				<h2 className="text-2xl mb-5">{event.title}</h2>
				<img src={event.image} alt={event.title} className="modal-image" />
				<p className="modal-description">{event.description}</p>
				{/* <p>
					<strong>📍 Location:</strong> {event.location}
				</p> */}
				<div className="grid grid-cols-[1fr_2fr] gap-1.5 text-md text-left">
					<label>Date</label>
					<div>
						{new Date(
							new Date().getTime() + 7 * 24 * 60 * 60 * 1000
						).toLocaleDateString()}
					</div>
					<label>Age</label>
					<div>{event.age}</div>
					<label>Attendees</label>
					<div>{event.attendees}</div>
					<label>Location</label>
					<div>{event.location}</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
