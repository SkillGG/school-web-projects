import React, { useEffect, useRef, useState } from "react";

type ContentData = {
  title?: string;
  show: boolean;
  text?: string;
};

import "./content.css";

export const Content: React.FunctionComponent<{ editable?: boolean }> = (
  { editable } = { editable: false }
) => {
  const [content, setContent] = useState<ContentData[]>(
    JSON.parse(localStorage.getItem("content") || "[]")
  );

  const [tempArt, setTempArt] = useState<ContentData>({ show: false });

  const [edit, setEdit] = useState<{ id: number; e: number }>({ id: 0, e: 0 });

  useEffect(() => {
    localStorage.setItem("content", JSON.stringify(content));
  }, [content]);

  const editRef = useRef<HTMLInputElement>(null);
  const taRef = useRef<HTMLTextAreaElement>(null);

  return (
    <>
      <div id="content">
        {content.map((r, i) => {
          const edited = i === edit.id;
          return (
            <article key={`${r.title || "" + r.text || ""}`}>
              <h2>
                {!edited || edit.e !== 1 ? (
                  r.title
                ) : (
                  <>
                    <input ref={editRef} />
                    <button
                      className="save"
                      onClick={() => {
                        if (editRef.current && editRef.current.value) {
                          r.title = editRef.current.value;
                          setContent(Object.assign([], content));
                        }
                        setEdit({ e: 0, id: 0 });
                      }}
                    >
                      Zapisz
                    </button>
                  </>
                )}
                {editable && !(edit.id === i && edit.e === 1) && (
                  <span
                    className="edit"
                    onClick={() => setEdit({ id: i, e: 1 })}
                  >
                    🖊
                  </span>
                )}
              </h2>
              <section>
                {!edited || edit.e !== 2 ? (
                  r.text
                ) : (
                  <>
                    <textarea ref={taRef} />
                    <button
                      className="save"
                      onClick={() => {
                        if (taRef.current && taRef.current.value) {
                          r.text = taRef.current.value; 
                          setContent(Object.assign([], content));
                        }
                        setEdit({ e: 0, id: 0 });
                      }}
                    >
                      Zapisz
                    </button>
                  </>
                )}
                {editable && !(edit.id === i && edit.e === 2) && (
                  <span
                    className="edit"
                    onClick={() => {
                      setEdit({ id: i, e: 2 });
                    }}
                  >
                    🖊
                  </span>
                )}
              </section>
            </article>
          );
        })}
        {tempArt.show && (
          <article>
            <h2>
              <input
                style={{
                  display: "inline-block",
                  width: "90%",
                  translate: "0.6%",
                  marginInline: "auto",
                }}
                type="text"
                onChange={(e) =>
                  setTempArt((p) => ({ ...p, title: e.target.value }))
                }
                value={tempArt.title || ""}
              />
              <input
                type="button"
                value="X"
                className={"close"}
                onClick={() => setTempArt({ show: false })}
              />
            </h2>
            <section>
              <textarea
                name="tmp"
                id="tmp"
                onChange={(e) =>
                  setTempArt((p) => ({ ...p, text: e.target.value }))
                }
                value={tempArt.text || ""}
              ></textarea>
            </section>
            <button
              className="save"
              onClick={() => {
                if (tempArt.title && tempArt.text) {
                  setContent((p) => [...p, tempArt]);
                  setTempArt((p) => ({ show: false }));
                }
              }}
            >
              Zapisz
            </button>
          </article>
        )}
        {editable ? (
          <>
            <div id="add" onClick={() => setTempArt((p) => ({ show: true }))}>
              Dodaj artykul
            </div>
          </>
        ) : null}
      </div>
    </>
  );
};
