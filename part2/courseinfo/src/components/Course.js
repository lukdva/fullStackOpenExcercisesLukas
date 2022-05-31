import React from 'react'

const Header = ({ course }) => <h2>{course}</h2>

const Total = ({ parts }) => {

const total = parts
.map(part => part.exercises)
.reduce(
  (first, second) => first + second
  );

return <p>Number of exercises {total}</p>
}
const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => 
  <>
  {parts.map(part => 
  <Part key={part.id} part={part}/>
  )}   
  </>

const Course = ({course}) => {
  return (
    <>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total parts = {course.parts}/>
    </>
  )
}
export default Course