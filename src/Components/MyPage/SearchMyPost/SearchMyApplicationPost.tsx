import react, { useState, useEffect } from 'react';
import MyPostTable from './MyPostTable';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { userSelector } from '../../../store/selectors/authSelectors';
import { changeGroupObjectToArray } from '../changeObjectToArray';
import { GroupPost } from './SearchMyTeamPost';

function SearchMyApplicationPost() {
  const [groupList, setGroupList] = useState<GroupPost[]>([]);
  const properties = ['작성자', '제목', '지역', '모집 상태', 'Player', 'GK'];
  const user = useSelector(userSelector);
  const filteredItems = groupList
    .reduce((acc: Array<GroupPost>, group: GroupPost) => {
      const filteredApplicants = group.applicant?.filter(
        (applicant) => applicant.name === user?.name
      );

      if (filteredApplicants && filteredApplicants.length > 0) {
        const filteredGroup: GroupPost = {
          ...group,
          applicant: filteredApplicants,
        };

        return [...acc, filteredGroup];
      }

      return acc;
    }, [])
    .map((item: GroupPost) => changeGroupObjectToArray(item));

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/groups`, {
        withCredentials: true,
      })
      .then((res) => res.data.data)
      .then((result) => {
        console.log(result);
        setGroupList(result);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <MyPostTable
      title="내가 신청한 팀 글"
      properties={properties}
      data={filteredItems}
    />
  );
}

export default SearchMyApplicationPost;
