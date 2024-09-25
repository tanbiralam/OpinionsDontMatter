import {
  generateKeyPair,
  signVote,
  verifyVote,
} from "../../utils/cryptoService";

let privateKey = null;
let publicKey = null; // Store public key for later verification

// Function to generate a key pair (run once, or on user session start)
export const initCrypto = async () => {
  const keyPair = await generateKeyPair();
  privateKey = keyPair.privateKey;
  publicKey = keyPair.publicKey; // Store the public key
};

export const upvote = async (id) => {
  const votes = localStorage.getItem("votes")
    ? JSON.parse(localStorage.getItem("votes"))
    : { upvotes: [], downvotes: [], signedVotes: [] }; // Ensure signedVotes exists

  if (votes.upvotes.includes(id)) {
    return false; // Already upvoted
  }

  votes.upvotes.push(id);
  votes.downvotes = votes.downvotes.filter((item) => item !== id);

  const voteData = { id, voteType: "upvote", timestamp: Date.now() };
  const { signature } = await signVote(voteData, privateKey);

  votes.signedVotes.push({ voteData, signature }); // Store signed vote

  localStorage.setItem("votes", JSON.stringify(votes));
  return true;
};

export const downvote = async (id) => {
  const votes = localStorage.getItem("votes")
    ? JSON.parse(localStorage.getItem("votes"))
    : { upvotes: [], downvotes: [], signedVotes: [] }; // Ensure signedVotes exists

  if (votes.downvotes.includes(id)) {
    return false; // Already downvoted
  }

  votes.downvotes.push(id);
  votes.upvotes = votes.upvotes.filter((item) => item !== id);

  const voteData = { id, voteType: "downvote", timestamp: Date.now() };
  const { signature } = await signVote(voteData, privateKey);

  votes.signedVotes.push({ voteData, signature }); // Store signed vote

  localStorage.setItem("votes", JSON.stringify(votes));
  return true;
};

export const checkIsAlreadyUpVoted = (id) => {
  const votes = JSON.parse(localStorage.getItem("votes"));
  return votes?.upvotes?.includes(id);
};

export const checkIsAlreadyDownVoted = (id) => {
  const votes = JSON.parse(localStorage.getItem("votes"));
  return votes?.downvotes?.includes(id);
};

export const processVotes = async () => {
  const votes = JSON.parse(localStorage.getItem("votes")) || {
    signedVotes: [],
  };

  for (const signedVote of votes.signedVotes) {
    const isValid = await verifyVote(signedVote, publicKey); // Pass public key for verification
    if (isValid) {
      // Process the valid vote, e.g., send it to the server or update the UI
      console.log(`Valid vote for idea ${signedVote.voteData.id}`);
    } else {
      console.error(`Invalid vote for idea ${signedVote.voteData.id}`);
    }
  }
};
