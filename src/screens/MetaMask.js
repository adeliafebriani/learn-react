import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useAtom } from 'jotai';
import { connectWallet, getContract } from '../util/contract';
import { accountAtom } from '../atoms/contract';

function MetaMask() {
  const { name, email, token } = useSelector((state) => state.user);
  const [account, setAccount] = useAtom(accountAtom);
  const [adminAddress, setAdminAddress] = useState('');
  const [regNewMember, setRegNewMember] = useState('');
  const [members, setMembers] = useState([]);
  const [nominateNewMember, setNominateNewMember] = useState('');
  const [nominees, setNominees] = useState([]);
  const [votingActive, setVotingActive] = useState(false);
  const [voteAddress, setVoteAddress] = useState('');
  const [votes, setVotes] = useState([]);
  const [winner, setWinner] = useState('');

  const handleWalletConnection = async () => {
    try {
      const { account } = await connectWallet();
      setAccount(account);
    } catch (error) {
      console.error(error?.message);
    }
  };

  const handleGetAdmin = async () => {
    if (!window.ethereum.isConnected()) return alert('Please install MetaMask');
    const { signer } = await connectWallet();
    const contract = getContract(signer);
    const response = await contract?.admin?.();
    setAdminAddress(response);
    console.log('Admin: ', response);
  };

  const handleRegisterMember = async () => {
    if (!window.ethereum.isConnected()) return alert('Please install MetaMask');
    if (!regNewMember) return alert('Please enter new member address');

    try {
      const { signer } = await connectWallet();
      const contract = getContract(signer);
      const transaction = await contract.registerMember(regNewMember);
      await transaction.wait();

      alert(`Member ${regNewMember} registered successfully`);
      setRegNewMember('');
      console.log('Registered new member: ', regNewMember);
      handleGetMembers();
    } catch (error) {
      console.error('Error registering member: ', error);
      alert('Failed!');
    }
  };

  const handleGetMembers = async () => {
    if (!window.ethereum.isConnected()) return alert('Please install MetaMask');
    const { signer } = await connectWallet();
    const contract = getContract(signer);
    const response = await contract?.getMembers?.();
    setMembers(response);
    console.log('Members: ', [...response]);
  };

  const handleNominateMember = async () => {
    if (!window.ethereum.isConnected()) return alert('Please install MetaMask');
    if (!nominateNewMember) return alert('Please enter nominate address');
    if (!members) return alert('Only registered members can nominate');

    try {
      const { signer } = await connectWallet();
      const contract = getContract(signer);
      const transaction = await contract.nominateMember(nominateNewMember);
      await transaction.wait();

      alert(`Member ${nominateNewMember} nominated successfully`);
      setNominateNewMember('');
      console.log('Nominated new member: ', nominateNewMember);
      handleGetNominees();
    } catch (error) {
      console.error('Error nominating member: ', error);
      alert('Failed!');
    }
  };

  const handleGetNominees = async () => {
    if (!window.ethereum.isConnected()) return alert('Please install MetaMask');
    const { signer } = await connectWallet();
    const contract = getContract(signer);
    const response = await contract?.getNominees?.();
    setNominees(response);
    console.log('Nominees: ', [...response]);
  };

  const handleGetVotingActive = async () => {
    if (!window.ethereum.isConnected()) return alert('Please install MetaMask');
    const { signer } = await connectWallet();
    const contract = getContract(signer);
    const response = await contract?.votingActive();
    setVotingActive(response);
    console.log('Voting Active: ', response);
  };

  const handleStartVoting = async () => {
    if (!window.ethereum.isConnected()) return alert('Please install MetaMask');
    if (!members.length) return alert ('Members must be registered first');
    if (!adminAddress) return alert('Only admin can start voting');

    try {
      const { signer } = await connectWallet();
      const contract = getContract(signer);
      const transaction = await contract.startVoting();
      await transaction.wait();

      alert('Voting started successfully');
      handleGetVotingActive();
    } catch (error) {
      console.error('Error starting voting: ', error);
      alert('Failed!');
    }
  };

  const handleVote = async () => {
    if (!window.ethereum.isConnected()) return alert('Please install MetaMask');
    if (!voteAddress) return alert('Please enter address to vote for');
    if (!members) return alert('Only registered members can vote');
    if (!nominees.includes(voteAddress)) return alert('Can only vote for nominated members');
    if (account === adminAddress) return alert('Admin cannot vote');
    if (members[account].vote) return alert('You have already voted');

    try {
      const { signer } = await connectWallet();
      const contract = getContract(signer);
      const transaction = await contract.vote();
      await transaction.wait();

      alert(`Voted for ${voteAddress} successfully`);
      setVoteAddress('');
      console.log('Voted for: ', voteAddress);
      handleGetVotes();
    } catch (error) {
      console.error('Error voting: ', error);
      alert('Failed!');
    }
  };

  const handleGetVotes = async () => {
    if (!window.ethereum.isConnected()) return alert('Please install MetaMask');
    const { signer } = await connectWallet();
    const contract = getContract(signer);
    const response = await contract?.getVotes?.();
    setVotes(response);
    console.log('Votes: ', response);
  };

  const handleEndVoting = async () => {
    if (!window.ethereum.isConnected()) return alert('Please install MetaMask');
    if (!adminAddress) return alert('Only admin can end voting');

    try {
      const { signer } = await connectWallet();
      const contract = getContract(signer);
      const transaction = await contract.endVoting();
      await transaction.wait();

      alert('Voting ended successfully');
      handleGetVotingActive();
      handleGetWinner();
    } catch (error) {
      console.error('Error ending voting: ', error);
      alert('Failed!');
    }
  };

  const handleGetWinner = async () => {
    if (!window.ethereum.isConnected()) return alert('Please install MetaMask');
    const { signer } = await connectWallet();
    const contract = getContract(signer);
    const response = await contract?.winner?.();
    setWinner(response);
    console.log('Winner: ', response);
  };

  const handleResetElection = async () => {
    if (!window.ethereum.isConnected()) return alert('Please install MetaMask');
    if (!adminAddress) return alert('Only admin can reset election');

    try {
      const { signer } = await connectWallet();
      const contract = getContract(signer);
      const transaction = await contract.resetElection();
      await transaction.wait();

      alert('Election reset successfully');
      setWinner('');
      setVotes([]);
      setNominees([]);
      setMembers([]);
      setVotingActive(false);
    } catch (error) {
      console.error(error);
      alert('Failed!');
    }
  };

  window?.ethereum?.on('accountsChanged', (accounts) => {
    const account = accounts?.length > 0 ? accounts[0] : '';
    setAccount(account);
  });

  return (
    <section className='App'>
      <main>
        <h2>Account Details</h2>
        {token && (
          <p>
            Name: {name}
            <br />
            Email: {email}
          </p>
        )}


        <br />
        <h2>Wallet Connection</h2>
        <button onClick={handleWalletConnection}>Connect Wallet</button>
        <br />
        <p>
          Connected Account:
          {account && (
            <span>
              {` ${account && account?.substring(0, 15)}.......${
                account && account?.substring(37, account?.length)
              }`}
            </span>
          )}
        </p>


        <br />
        <h2>Admin Details</h2>
        <button onClick={handleGetAdmin}>Get Admin</button>
        <br />
        <p>Admin Address: {adminAddress}</p>


        <br />
        <div>
          <h2>Register New Member</h2>
          <input
            type="text"
            value={regNewMember}
            onChange={(e) => setRegNewMember(e.target.value)}
            placeholder="Enter member address"
          />
          <button onClick={handleRegisterMember}>Register Member</button>
        </div>
        <p>New Member Address: {regNewMember}</p>
        <br />
        <button onClick={handleGetMembers}>Get Members</button>
        <p>Members: {members.join(', ')}</p>


        <br />
        <div>
          <h2>Nominate New Member</h2>
          <input
            type="text"
            value={nominateNewMember}
            onChange={(e) => setNominateNewMember(e.target.value)}
            placeholder="Enter member address"
          />
          <button onClick={handleNominateMember}>Nominate Member</button>
        </div>
        <p>Nominated New Member: {nominateNewMember}</p>
        <br />
        <button onClick={handleGetNominees}>Get Nominees</button>
        <p>Nominees: {nominees.join(', ')}</p>


        <br />
        <h2>Voting</h2>
        <button onClick={handleGetVotingActive}>Check Voting Active</button>
        <p>Voting Active: {votingActive ? 'Active' : 'Inactive'}</p>
        <br />
        <button onClick={handleStartVoting}>Start Voting</button>


        <br />
        <div>
          <h2>Vote</h2>
          <input
            type="text"
            value={voteAddress}
            onChange={(e) => setVoteAddress(e.target.value)}
            placeholder="Enter address to vote for"
          />
          <button onClick={handleVote}>Vote</button>
        </div>
        <p>Vote Address: {voteAddress}</p>


        <br />
        <button onClick={handleGetVotes}>Get Votes</button>
        <p>Votes: {JSON.stringify(votes)}</p>


        <br />
        <button onClick={handleEndVoting}>End Voting</button>
        <p>Winner: {winner}</p>


        <br />
        <h2>Reset Election</h2>
        <button onClick={handleResetElection}>Reset Election</button>


        <br />
        <br />
      </main>
    </section>
  );
}

export default MetaMask;
