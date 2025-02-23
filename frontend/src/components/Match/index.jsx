import { members } from "@/hook/chats";
import { matchStore, useMatch } from "@/hook/match";
import { TbArrowBigRightLines } from "react-icons/tb";
import { Link } from "react-router-dom";

const Match = () => {
	const { match } = useMatch();

	if (!match) {
		return <></>;
	}

	if (match) {
		return (
			<div className="fixed bottom-0 right-0 bg-white p-5 shadow-lg">
				<h2>You&apos;ve got a match!</h2>

				<div>
					<div>
						{match.members.map((m) => members[m].username).join(", ")} and you
						have matched! You are all interested in {match.topic}. Get the
						conversation started in the group chat!
					</div>
					<Link to={`/chats/${match.id}`}>
						<div className="flex gap-2 underline cursor-pointer" onClick={matchStore.clearMatch}>
							Take me there!
							<TbArrowBigRightLines />
						</div>
					</Link>
				</div>
			</div>
		);
	}
};

export default Match;
