import React from "react";
import PropTypes from "prop-types";
import "./style.css";


export default function List({ name, slides, previewImage}) {
    console.log(slides)
  if (!slides) {
    return <></>;
  }
  return (
    <div className="frame">
    <div className="center">
          <section className="todo-cmp">
              <header className="todo-cmp__header">
                  <h2>{name}</h2>
              </header>
                  <ul className="todo-cmp__list">
                  {slides.map((slide, index) => {
                        return (
                          <button
                            key={index}
                            onClick={() => {
                              return previewImage(slide);
                            }}
                          >
                            {slide.name}
                          </button>
                        );
                      })}
                  {slides.map((slide, index) => {
                        return (
                            <li key={slide.name}>
                                    <button
                          for={index}
                            key={index}
                            onClick={() => {
                              return previewImage(slide);
                            }}
                          >
                                 <span>   {slide.name}</span>
                         
                          </button>
                                </li>
                      
                        );
                      })}
                      <li>
                          <label for="todo-01">
                              {/* <input id="todo-01" type="checkbox"> */}
                              <span>Open template</span>
                          </label>
                      </li>
                      <li>
                          <label for="todo-02">
                              {/* <input id="todo-02" type="checkbox"> */}
                              <span>Build a to-do list</span>
                          </label>
                      </li>
                          <li>
                          <label for="todo-03">
                              {/* <input id="todo-03" type="checkbox"> */}
                              <span>Write something</span>
                          </label>
                      </li>
                      <li>
                          <label for="todo-04">
                              {/* <input id="todo-04" type="checkbox"> */}
                              <span>Complete the task</span>
                          </label>
                      </li>
              </ul>
          </section>
    </div>
  </div>
  );
}

List.propTypes = {
    slides: PropTypes.array,
    name: PropTypes.string,
    previewImage: PropTypes.func
};