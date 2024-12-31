import React, { useState, useEffect } from 'react';
import '../projectStyles.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProject } from '../../ReduxKit/Slices/ProjectManagement/ProjectSlice';
import { fetchSolution } from '../../ReduxKit/Slices/ProjectManagement/SolutionSlice';
import { fetchFeature } from '../../ReduxKit/Slices/ProjectManagement/FeatureSlice';
import { fetchUseCase } from '../../ReduxKit/Slices/ProjectManagement/Usecase';
import { Button } from '@mui/material';

const AddTask = () => {
  const dispatch = useDispatch();
  const { project } = useSelector((state) => state?.projectList);
  const { Solution } = useSelector((state) => state?.solutionList);
  const { Feature } = useSelector((state) => state?.featureList);
  const { UseCase } = useSelector((state) => state?.useCaseList);

  console.log('project',project);
  console.log('Solution',Solution);
  console.log('Feature',Feature);
  console.log('UseCase',UseCase);

  const [formData, setFormData] = useState({
    project_id: '',
    solution_id: '',
    feature_id: '',
    usecase_id: ''
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([
        dispatch(fetchProject()),
        dispatch(fetchSolution()),
        dispatch(fetchFeature()),
        dispatch(fetchUseCase())
      ]);
      setIsLoading(false);
    };
    fetchData();
  }, [dispatch]);

  function handleChange(e) {
    const { name, value } = e?.target;
    setFormData((prevValue) => ({ ...prevValue, [name]: value }));
  }

  const resetForm = () => {
    setFormData({
      project_id: '',
      solution_id: '',
      feature_id: '',
      usecase_id: ''
    });
  };

  const handleSubmit = () => {
    console.log('Form Data:', formData);
    // Add your API or action logic here
  };

  return (
    <>
      <div className="create-task">
        <div className="dir-row">
          {/* PROJECT */}
          <div className="dir-col-q">
            <label htmlFor="project-select" className="label">
              Select Project
            </label>
            <select
              id="project-select"
              className="form-select select"
              name="project_id"
              value={formData?.project_id || ''}
              onChange={handleChange}
              disabled={isLoading}
            >
              <option value="" disabled>
                {isLoading ? 'Loading...' : 'Select a project'}
              </option>
              {project?.map((_p, index) => (
                <option key={index} value={_p?.id}>
                  {_p?.project_name}
                </option>
              ))}
            </select>
          </div>

          {/* SOLUTION */}
          <div className="dir-col-q">
            <label htmlFor="solution-select" className="label">
              Select Solution
            </label>
            <select
              id="solution-select"
              className="form-select select"
              name="solution_id"
              value={formData?.solution_id || ''}
              onChange={handleChange}
              disabled={isLoading}
            >
              <option value="" disabled>
                {isLoading ? 'Loading...' : 'Select a solution'}
              </option>
              {Solution?.map((_p, index) => (
                <option key={index} value={_p?.id}>
                  {_p?.solution_name}
                </option>
              ))}
            </select>
          </div>

          {/* FEATURE */}
          <div className="dir-col-q">
            <label htmlFor="feature-select" className="label">
              Select Feature
            </label>
            <select
              id="feature-select"
              className="form-select select"
              name="feature_id"
              value={formData?.feature_id || ''}
              onChange={handleChange}
              disabled={isLoading}
            >
              <option value="" disabled>
                {isLoading ? 'Loading...' : 'Select a feature'}
              </option>
              {Feature?.map((_p, index) => (
                <option key={index} value={_p?.id}>
                  {_p?.feature_name}
                </option>
              ))}
            </select>
          </div>

          {/* USECASE */}
          <div className="dir-col-q">
            <label htmlFor="usecase-select" className="label">
              Select Usecase
            </label>
            <select
              id="usecase-select"
              className="form-select select"
              name="usecase_id"
              value={formData?.usecase_id || ''}
              onChange={handleChange}
              disabled={isLoading}
            >
              <option value="" disabled>
                {isLoading ? 'Loading...' : 'Select a usecase'}
              </option>
              {UseCase?.map((_p, index) => (
                <option key={index} value={_p?.id}>
                  {_p?.usecase_name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="btn-display">
        <Button variant="outlined" color="primary" onClick={resetForm}>
          Reset
        </Button>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Create Task
        </Button>
      </div>
    </>
  );
};

export default AddTask;
