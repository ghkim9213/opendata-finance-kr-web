import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { ExampleClient } from '../clients/ExampleClient';
import { User } from '@firebase/auth';
import { signIn } from '../utils/signIn';

const Examples = () => {
  const currentUser = useContext(AuthContext);
  const [client, setClient] = useState<ExampleClient|null>(null);
  const [exampleList, setExampleList] = useState<any>(null);
  const updateList = (userOnly: boolean) => {
    client?.list(userOnly).then(ls => setExampleList(ls))
  };
  useEffect(() => {
    if (!currentUser) return;
    setClient(new ExampleClient(currentUser));
  }, [currentUser]);
  useEffect(() => {
    if (!client) return;
    updateList(false);
  }, [client]);
  const [userOnly, setUserOnly] = useState<boolean>(false);
  useEffect(() => {
    updateList(userOnly);
  }, [userOnly]);

  const [title, setTitle] = useState<string>('');
  const [desc, setDesc] = useState<string>('');
  const [sharedUrl, setSharedUrl] = useState<string>('');
  const [agree, setAgree] = useState<boolean>(false);
  const [valid, setValid] = useState<boolean>(false);
  const [invalidUrlMsg, setInvalidUrlMsg] = useState<string|null>(null);
  const CHECKBOX_MSG = `
    공유링크 생성시 액세스 권한을 '편집자'로 설정하면,
    링크를 가진 모든 사용자에게 해당 노트북에 대한 편집권한이 부여되어 노트북을 망칠 수 있습니다.
    액세스 권한이 '뷰어' 혹은 '댓글 작성자'로 설정되어있는지 확인 후 공유하시기 바랍니다.
    미숙지로 인한 피해는 책임지지 않습니다.
  `
  useEffect(() =>{
    const nonEmptyTitle = title != '';
    const nonEmptyDesc = desc != '';
    const validUrl = sharedUrl.startsWith('https://colab.research.google.com/drive/');
    if (validUrl) {
      setInvalidUrlMsg(null)
    } else {
      setInvalidUrlMsg('googl colab의 공유링크가 아닙니다.')
    };
    if (nonEmptyTitle && nonEmptyDesc && validUrl && agree) {
      setValid(true)
    } else {
      setValid(false)
    }
  }, [title, desc, agree, sharedUrl]);
  return (
    <>
    <div className='container'>
      <div className="row py-lg-5">
        <div className='mb-3'>
          <h2 className='display-5 fw-light'>Examples</h2>
          <p className='lead text-muted'>opendata-finance-kr의 활용예시를 공유해보세요.</p>
          {
            currentUser && (
              <div>
                <button className='btn btn-lg btn-success me-2' data-bs-toggle='modal' data-bs-target='#submitModal'><i className='bi bi-plus me-2' />공유하기</button>
                {
                  userOnly && (
                    <button
                      className='btn btn-lg btn-outline-dark me-2'
                      onClick={() => setUserOnly(false)}
                    >모든 게시물</button>
                  )
                }
                {
                  !userOnly && (
                    <button
                      className='btn btn-lg btn-outline-dark me-2'
                      onClick={() => setUserOnly(true)}
                    >내 게시물</button>
                  )
                }
              </div>
            )
          }
          {
            !currentUser && (
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={() => signIn()}
              >Login / Register with Google</button>
            )
          }
        </div>
        <div>
          <table className='table table-hover'>
            <thead>
              <tr>
                <th>제목</th>
                <th>요약</th>
                <th>작성자</th>
                <th>보기</th>
                {
                  userOnly && (
                    <th></th>
                  )
                }
              </tr>
            </thead>
            <tbody>
            {
              !exampleList || exampleList.length === 0 && (
                <tr>
                  <td colSpan={4}>표시할 게시물이 존재하지 않습니다.</td>
                </tr>
              )
            }
            {
              exampleList?.map((r: any) => (
                <tr key={r.id}>
                  <td>{r.title}</td>
                  <td>{r.desc}</td>
                  <td>{r.author}</td>
                  <td>
                    <a href={r.sharedUrl}><i className='bi bi-box-arrow-right'/></a>
                  </td>
                  {
                    userOnly && (
                      <td>
                        <button
                          onClick={() => {
                            client?.delete(`${r.id}`)
                              .then(() => updateList(userOnly));
                          }}
                          className='btn btn-link m-0 p-0'
                        ><i className='bi bi-trash text-danger'/></button>
                      </td>
                    )
                  }
                </tr>
              ))
            }
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div
      className='modal fade'
      id='submitModal'
      tabIndex={-1}
      aria-labelledby='submitExample'
      aria-hidden={true}
    >
      <div className='modal-dialog'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h1 className='modal-title fs-5'>Google colab 노트북 공유하기</h1>
            <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close' />
          </div>
          <div className='modal-body'>
            <div className='mb-3'>
              <label htmlFor='autor' className='col-form-label'>작성자: </label>
              <input type='text' className='form-control' id='author' placeholder={currentUser?.email as any} disabled/>
            </div>
            <div className='mb-3'>
              <label htmlFor='title' className='col-form-label'>제목: </label>
              <input type='text' className='form-control' id='title' onChange={(
                e: React.FormEvent<HTMLInputElement>
              ) => setTitle(e.currentTarget.value)}
              placeholder='노트북의 제목을 입력해주세요.'
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='desc' className='col-form-label'>요약: </label>
              <textarea className='form-control' id='desc' onChange={(
                e: React.FormEvent<HTMLTextAreaElement>
              ) => setDesc(e.currentTarget.value)}
              placeholder='노트북에 대한 간략한 설명을 입력해주세요.'
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='sharedUrl' className='col-form-label'>colab 노트북 공유링크: </label>
              <input type='text' className='form-control' id='sharedUrl' onChange={(
                e: React.FormEvent<HTMLInputElement>
              ) => setSharedUrl(e.currentTarget.value)}
              placeholder='구글에서 생성한 노트북의 공유링크를 입력해주세요.'
              />
              {
                invalidUrlMsg && (
                  <div className='form-text text-danger'>{invalidUrlMsg}</div>
                )
              }
            </div>
            <div className='form-check mb-3'>
              <input type='checkbox' className='form-check-input' id='agree' onChange={(
                e: React.FormEvent<HTMLInputElement>
              ) => setAgree(e.currentTarget.checked)}/>
              <label htmlFor='agree' className='form-check-label'>
                일반 액세스 설정이 '편집자'가 아님을 확인했습니다.
                <span>
                  <button
                    className='btn btn-sm btn-link ms-2 p-0'
                    data-bs-toggle='collapse'
                    data-bs-target='#checkboxWarning'
                    role='button'
                    aria-expanded={false}
                    aria-controls='checkboxWarning'
                  >
                  <i className='bi bi-question-circle'/></button></span>
              </label>
            </div>
            <div className='collapse collapse-horizontal mt-3' id='checkboxWarning'>
              <div className='card card-body'>{CHECKBOX_MSG}</div>
            </div>
          </div>
          <div className='modal-footer'>
            <button
              type='button'
              className='btn btn-primary'
              onClick={() => {
                client?.create(
                  title, desc, sharedUrl
                ).then(() => updateList(userOnly))
              }}
              data-bs-dismiss='modal'
              disabled={!valid}
            >공유하기</button>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Examples
