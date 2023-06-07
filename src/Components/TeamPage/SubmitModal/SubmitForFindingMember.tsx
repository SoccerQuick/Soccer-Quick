import React from 'react';
import styled from 'styled-components';
import DropDown from '../../Commons/DropDown';
import FILTERING_OPTIONS from '../../Commons/FilteringOptions';
import { setPriority } from 'os';
import axios from 'axios';

type props = {
  groupId: string | undefined;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

function DetailModal(props: props) {
  const { groupId, setShowModal } = props;
  const [author, setAuthor] = React.useState('');
  const [position, setPosition] = React.useState('');
  const [skill, setSkill] = React.useState('');
  const [gender, setGender] = React.useState('');
  const [memo, setMemo] = React.useState('');

  const config = {
    withCredentials: true,
  };

  function SubmitButton() {
    const data = {
      position: position,
      level: skill,
      contents: memo,
    };
    axios
      .post(`${process.env.REACT_APP_API_URL}/group/${groupId}`, data, config)
      .then((res) => {
        console.log('신청 성공 : ', res.data);
      })
      .catch((e) => {
        console.error('신청 실패 : ', e);
      });

    console.log(data);
  }

  return (
    <>
      <Modal>
        <ModalPage>
          <button
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
            }}
            onClick={() => {
              setShowModal(false);
            }}
          >
            X
          </button>
          <DetailPage>
            <StyledHeader>
              <div
                style={{
                  fontSize: '2rem',
                }}
              >
                <StyledSpan>작성자</StyledSpan>
                <StyledInput
                  onChange={(e) => {
                    setAuthor(e.target.value);
                  }}
                />
              </div>
            </StyledHeader>
            <StyledSubTitle>
              <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <StyledBlock>
                  <DropDown
                    list={FILTERING_OPTIONS.findingTeam.position}
                    selected={position}
                    setSelected={setPosition}
                  />
                </StyledBlock>
                <StyledBlock>
                  <DropDown
                    list={FILTERING_OPTIONS.findingTeam.skill}
                    selected={skill}
                    setSelected={setSkill}
                  />
                </StyledBlock>
                <StyledBlock>
                  <DropDown
                    list={FILTERING_OPTIONS.findingTeam.gender}
                    selected={gender}
                    setSelected={setGender}
                  />
                </StyledBlock>
              </div>
              <StyledBlock>
                <StyledSpan>메모</StyledSpan>
                <StyledInput
                  style={{ width: '53rem' }}
                  onChange={(e) => {
                    setMemo(e.target.value);
                  }}
                />
              </StyledBlock>
            </StyledSubTitle>
          </DetailPage>
          <StyledButtonContainer>
            <StyledButton onClick={SubmitButton}>제출</StyledButton>
            <StyledButton
              onClick={() => {
                setShowModal(false);
              }}
            >
              취소
            </StyledButton>
          </StyledButtonContainer>
        </ModalPage>
      </Modal>
    </>
  );
}

export default DetailModal;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 500;
`;

const ModalPage = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70rem;
  height: 35rem;
  background-color: rgba(255, 255, 255);
  z-index: 501;
`;

const DetailPage = styled.div`
  z-index: 900;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: beige;
  width: 90%;
  font-size: 2.3rem;

  table {
    width: 100%;
  }

  tr {
    justify-content: space-between;
    align-items: center;
  }
  td {
    justify-content: center;
    align-items: center;
    text-align: center;
  }
`;

const StyledHeader = styled.div`
  z-index: 901;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  top: 0;
  margin-top: 4rem;
  padding-bottom: 1rem;
  width: 90%;
  border-bottom: 1px solid #dddddd;
`;

const StyledSubTitle = styled.div`
  z-index: 901;
  font-size: 1.8rem;
  position: absolute;
  top: 0;
  margin-top: 11.5rem;
`;

const StyledBlock = styled.div`
  z-index: 901;
  display: block;
  /* background-color: skyblue; */
  /* border: 1px solid #dddddd; */
  border-radius: 2rem;
  margin: 0.7rem;
  padding: 1rem 1rem;
`;

const StyledInput = styled.input`
  z-index: 901;
  width: 8rem;
`;

const StyledSpan = styled.span`
  z-index: 901;
  display: inline-block;
  text-align: center;
  margin-top: 0.4rem;
  width: 6rem;
`;

const StyledButtonContainer = styled.div`
  z-index: 899;
  display: flex;
  font-size: 1.8rem;
  justify-content: center;
  position: absolute;
  top: 0;
  margin-left: 44rem;
  margin-top: 28rem;
  width: 90%;
  border-radius: 1rem;
`;

const StyledButton = styled.button`
  z-index: 900;
  margin: 0rem 1.5rem;
  height: 4rem;
  padding: 0rem 2rem;
  border-radius: 2rem;
`;
