import * as React from 'react';
import reactDom from 'react-dom';
import styled from 'styled-components';
import useLocalStorage from '../../hooks/useLocalStorage/useLocalStorage';

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  background-color: #e1e1e1;
  padding: 20px 100px;
`;

const Label = styled.label`
  font-weight: bold;
`;

const UsernameInput = styled.input`
  border: 1px solid #a0a0a0;
  border-radius: 3px;
  height: 24px;
  margin: 0 16px;
`;

const Result = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin-top: 24px;

  strong {
    margin-right: 16px;
  }
`;
const UsernameForm = ({ initialUsername = '' }) => {
  const [name, setName] = useLocalStorage('name', initialUsername);

  const handelChange = (event) => {
    const username = event.target.value;
    setName(username);
  };

  const handelClick = () => {
    setName('');
  };
  return (
    <FormWrapper>
      <form>
        <Label>Username:</Label>
        <UsernameInput
          type="text"
          onChange={handelChange}
          value={name}
        ></UsernameInput>
        <button onClick={handelClick}>Clear</button>
      </form>

      {name && (
        <Result>
          <strong>You entered: </strong>
          {name}
        </Result>
      )}
    </FormWrapper>
  );
};

export default UsernameForm;
