import styled from '@emotion/styled';
import Btn from 'components/Btn';
import { useAppSelector } from 'hooks';
import React, { useEffect, useState } from 'react';

const Wrap = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
`;

const SettingPanel = styled.div<IThemeProps>`
  max-width: 800px;
  width: 100%;
  border-radius: 8px;
  padding: 30px;
`;

const Title = styled.h3<IThemeProps>`
  font-size: ${({ theme }) => theme.fontSizes.fs_1};
  padding-bottom: 10px;
`;

const SettingList = styled.ul<IThemeProps>`
  list-style: none;
  border-top: 1px solid ${({ theme }) => theme.color.gray_300};
  border-bottom: 1px solid ${({ theme }) => theme.color.gray_300};
  margin: 0;
`;

const SettingItem = styled.li<IThemeProps>`
  border-bottom: 1px solid ${({ theme }) => theme.color.gray_400};
  padding: 10px;
`;

const SettingItemContent = styled.div`
  display: flex;
  align-items: center;
`;

const SettingItemTitle = styled.h4`
  align-self: flex-start;
  line-height: 20px;
  width: 100px;
`;

const SettingItemMain = styled.div<IThemeProps>`
  flex-grow: 1;
  .email-note {
    color: ${({ theme }) => theme.color.gray_300};
    font-size: ${({ theme }) => theme.fontSizes.fs_5};
  }
`;

const EditButton = styled(Btn)<IThemeProps>`
  display: flex;
  align-items: center;
  transition: transform .1s ease-in-out;
  &:hover {
    transform: scale(1.1);
    .material-icons-outlined {
      color: ${({ theme }) => theme.color.primary};
    }
  }
  &:active {
    transform: scale(0.97);
  }
  .material-icons-outlined {
    color: ${({ theme }) => theme.color.secondary};
    font-size: ${({ theme }) => theme.fontSizes.fs_1};
    transition: color .1s ease-in-out;
  }
  .delete-icon {
    color: ${({ theme }) => theme.color.red_100};
  }
`;

const CitiesSelectContainer = styled.div<IThemeProps>`
  position: relative;
  max-width: 120px;
  input {
    &:focus {
      outline: 1px solid ${({ theme }) => theme.color.secondary};
    }
  }
  .selected-city {
    width: 100%;
    background-color: ${({ theme }) => theme.color.white_100};
    border: 1px solid ${({ theme }) => theme.color.gray_100};
    box-shadow: ${({ theme }) => theme.shadow.s};
    border-radius: 8px;
    padding: 5px 10px;
  }
`;

const CitiesSelectList = styled.ul<IThemeProps & { show: boolean }>`
  display: ${({ show }) => (show ? 'block' : 'none')};
  position: absolute;
  width: 100%;
  bottom: -3px;
  background-color: ${({ theme }) => theme.color.white_100};
  list-style: none;
  box-shadow: ${({ theme }) => theme.shadow.s};
  border: 1px solid ${({ theme }) => theme.color.gray_100};
  border-radius: 8px;
  transform: translateY(100%);
  overflow: hidden;
  li {
    text-align: center;
    cursor: default;
    background-color: ${({ theme }) => theme.color.white_100};
    padding: 6px;
    &:hover {
      filter: brightness(0.95);
    }
  }
`;

const SettingItemEditPanel = styled.div<IThemeProps>`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.color.gray_400};
  border-radius: 8px;
  margin: 0 -10px;
  padding: 10px;
`;

const SettingItemEditPanelTitle = styled.h4<IThemeProps>`
  flex-shrink: 0;
  width: 100px;
  align-self: flex-start;
`;

const SettingItemEditPanelInput = styled.input<IThemeProps>`
  flex-grow: 1;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.color.orange_100};
  padding: 5px 10px;
  margin-right: auto;
  &:focus-visible {
    outline: 1px solid ${({ theme }) => theme.color.secondary};
  }
`;

const SettingItemEditPanelSaveBtn = styled.button<IThemeProps>`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  border: none;
  color: ${({ theme }) => theme.color.green_100};
  margin-left: 30px;
  &:hover {
    transform: scale(1.1);
  }
  &:active {
    transform: scale(0.97);
  }
  .material-icons-outlined {
    margin-right: 3px;
    font-size: ${({ theme }) => theme.fontSizes.fs_3};
  }
`;

const EmailList = styled.ul`
  list-style: none;
  margin: 20px 0;
`;

const EmailItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  p {
    margin-right: 10px;
  }
`;

const AddEmailGroup = styled.div`
  display: flex;
  align-items: center;
`;

const AddEmailBtn = styled(Btn)<IThemeProps>`
  display: flex;
  align-items: center;
  transition: transform .1s ease-in-out;
  color: ${({ theme }) => theme.color.primary};
  &:hover {
    transform: scale(1.1);
  }
  &:active {
    transform: scale(0.97);
  }
  .material-icons-round {
    margin-right: 3px;
    font-size: ${({ theme }) => theme.fontSizes.fs_3};
  }
`;

const General: React.FC = () => {
  const profile = useAppSelector((state) => state.userInfo.profile);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [emails, setEmails] = useState([{ email: 'aaa@gmail.com', isEdit: false }, { email: 'bbb@gmail.com', isEdit: false }]);
  const cities = ['台北市', '桃園市', '新北市', '高雄市'];
  const [matchedCities, setMatchCities] = useState<string[]>([]);
  const [isCitySelectShow, setIsCitySelectShow] = useState(false);
  const [inputs, setInputs] = useState({
    name: {
      value: '',
      isEdit: false,
    },
    email: {
      value: JSON.parse(JSON.stringify(emails)) as IEmail[],
      isEdit: false,
      addEmail: '',
    },
    city: {
      value: '',
      isEdit: false,
    },
  });

  const hideCitiesList = (e: React.MouseEvent<HTMLElement> | Event) => {
    if ((e.target as Element).closest('.cities-selector')) return;
    setIsCitySelectShow(false);
    document.body.removeEventListener('click', hideCitiesList);
  };

  useEffect(() => {
    const filterMatchInputCities = () => {
      const matchCitiesData = cities.filter((city) => city.match(inputs.city.value));
      setMatchCities(matchCitiesData);
    };

    filterMatchInputCities();
  }, [inputs.city.value]);

  useEffect(() => () => {
    document.body.removeEventListener('click', hideCitiesList);
  }, []);

  return (
    <Wrap>
      <SettingPanel>
        <Title>一般設定</Title>
        <SettingList>
          <SettingItem>
            {inputs.name.isEdit ? (
              <SettingItemEditPanel>
                <SettingItemEditPanelTitle>姓名</SettingItemEditPanelTitle>
                <SettingItemEditPanelInput
                  value={inputs.name.value}
                  onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => {
                    if (e.key === 'Escape') {
                      setInputs((prev) => ({
                        ...prev,
                        name: {
                          value: prev.name.value,
                          isEdit: false,
                        },
                      }));
                    }
                  }}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setInputs((prev) => ({
                      ...prev,
                      name: { value: e.target.value, isEdit: true },
                    }));
                  }}
                />
                <SettingItemEditPanelSaveBtn type="button">
                  <span className="material-icons-outlined">save</span>儲存
                </SettingItemEditPanelSaveBtn>
              </SettingItemEditPanel>
            ) : (
              <SettingItemContent>
                <SettingItemTitle>姓名</SettingItemTitle>
                <SettingItemMain>
                  <p>{profile.name}</p>
                </SettingItemMain>
                <EditButton
                  type="button"
                  onClick={() => setInputs((prev) => ({
                    ...prev,
                    name: { value: profile.name!, isEdit: true },
                  }))}
                >
                  <span className="material-icons-outlined">settings</span>
                </EditButton>
              </SettingItemContent>
            )}
          </SettingItem>
          <SettingItem>
            {inputs.email.isEdit ? (
              <SettingItemEditPanel>
                <SettingItemEditPanelTitle>聯絡資料</SettingItemEditPanelTitle>
                <SettingItemMain>
                  <p>{profile.email} <span className="email-note">(主要)</span></p>
                  <EmailList>
                    {emails.map((emailItem, key) => (
                      <EmailItem key={emailItem.email}>
                        {inputs.email.value[key].isEdit ? (
                          <SettingItemEditPanelInput
                            value={inputs.email.value[key].email}
                            onKeyUp={(e) => {
                              if (e.code === 'Escape') {
                                setInputs((prev) => {
                                  const temp = { ...prev };
                                  temp.email.value[key].isEdit = false;

                                  return temp;
                                });
                              }
                            }}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                              setInputs((prev) => {
                                const temp = { ...prev };
                                temp.email.value[key].email = e.target.value;

                                return temp;
                              });
                            }}
                          />
                        ) : <p>{emailItem.email} <span className="email-note">(備用)</span></p>}
                        <EditButton
                          type="button"
                          onClick={() => setInputs((prev) => {
                            const tempInputs = { ...prev };
                            tempInputs.email.value[key].isEdit = true;

                            return tempInputs;
                          })}
                        >
                          <span className="material-icons-outlined">settings</span>
                        </EditButton>
                        <EditButton type="button">
                          <span className="material-icons-outlined delete-icon">delete</span>
                        </EditButton>
                      </EmailItem>
                    ))}
                  </EmailList>
                  <AddEmailGroup>
                    <SettingItemEditPanelInput
                      placeholder="填寫想新增的Email"
                      value={inputs.email.addEmail}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setInputs((prev) => ({
                          ...prev,
                          email: {
                            value: prev.email.value,
                            isEdit: true,
                            addEmail: e.target.value,
                          },
                        }));
                      }}
                    />
                    <AddEmailBtn type="button">
                      <span className="material-icons-round">add</span>新增Email
                    </AddEmailBtn>
                  </AddEmailGroup>
                </SettingItemMain>
                <SettingItemEditPanelSaveBtn
                  type="button"
                  onClick={() => setInputs((prev) => ({
                    ...prev,
                    email: {
                      value: prev.email.value.map(
                        (email) => ({ email: email.email, isEdit: false }),
                      ),
                      isEdit: false,
                      addEmail: '',
                    },
                  }))}
                >
                  <span className="material-icons-outlined">logout</span>關閉
                </SettingItemEditPanelSaveBtn>
              </SettingItemEditPanel>
            ) : (
              <SettingItemContent>
                <SettingItemTitle>聯絡資料</SettingItemTitle>
                <SettingItemMain>
                  <p>{profile.email} <span className="email-note">(主要)</span></p>
                  <EmailList>
                    {emails.map((emailItem) => (
                      <EmailItem key={emailItem.email}>
                        <p>{emailItem.email} <span className="email-note">(備用)</span></p>
                      </EmailItem>
                    ))}
                  </EmailList>
                </SettingItemMain>
                <EditButton
                  type="button"
                  onClick={() => setInputs((prev) => ({
                    ...prev,
                    email: {
                      value: prev.email.value,
                      isEdit: true,
                      addEmail: prev.email.addEmail,
                    },
                  }))}
                >
                  <span className="material-icons-outlined">settings</span>
                </EditButton>
              </SettingItemContent>
            )}
          </SettingItem>
          <SettingItem>
            {inputs.city.isEdit ? (
              <SettingItemEditPanel>
                <SettingItemEditPanelTitle>現居住地</SettingItemEditPanelTitle>
                <SettingItemMain>
                  <CitiesSelectContainer className="cities-selector">
                    <input
                      className="selected-city"
                      value={inputs.city.value}
                      onFocus={() => {
                        setIsCitySelectShow(true);
                        document.body.addEventListener('click', hideCitiesList);
                      }}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setInputs((prev) => ({
                          ...prev,
                          city: {
                            value: e.target.value,
                            isEdit: true,
                          },
                        }));
                      }}
                    />
                    <CitiesSelectList show={isCitySelectShow}>
                      {matchedCities.map((city) => (
                        <li
                          key={city}
                          onClick={() => {
                            setInputs((prev) => ({
                              ...prev,
                              city: {
                                value: city,
                                isEdit: true,
                              },
                            }));
                            setIsCitySelectShow(false);
                          }}
                        >{city}
                        </li>
                      ))}
                    </CitiesSelectList>
                  </CitiesSelectContainer>
                </SettingItemMain>
                <SettingItemEditPanelSaveBtn
                  type="button"
                  onClick={() => setInputs((prev) => ({
                    ...prev,
                    city: {
                      value: prev.city.value,
                      isEdit: false,
                    },
                  }))}
                >
                  <span className="material-icons-outlined">logout</span>關閉
                </SettingItemEditPanelSaveBtn>
              </SettingItemEditPanel>
            ) : (
              <SettingItemContent>
                <SettingItemTitle>現居住地</SettingItemTitle>
                <SettingItemMain>
                  <p>台北市</p>
                </SettingItemMain>
                <EditButton
                  type="button"
                  onClick={() => setInputs((prev) => ({
                    ...prev,
                    city: {
                      value: prev.city.value,
                      isEdit: true,
                    },
                  }))}
                >
                  <span className="material-icons-outlined">settings</span>
                </EditButton>
              </SettingItemContent>
            )}
          </SettingItem>
        </SettingList>
      </SettingPanel>
    </Wrap>
  );
};

export default General;
