import useMoneyInvitations from '../hooks/useMoneyInvitations';
import { MyCheckbox } from '../../../../_components/reuse/my-checkbox';
import { IEntityInvitation } from '../entity-invitation-type';
import { useBetween } from '../../../../hooks/useBetween';

const AcceptedInvitations = () => {
  const { invitations } = useBetween(useMoneyInvitations);

  return (
    <div>
      <div className="flex fwrap fcenter">
        {invitations?.map((el: IEntityInvitation) => (
          <div
            className="mycardFilter"
            style={{ marginLeft: '1px', marginTop: '1px' }}
            key={el.name}
          >
            <MyCheckbox
              css="checkbox"
              id={el._id}
              // onChange={() => toggleInvitationSelection(el)}
              onChange={() => {}}
              label={el.name}
              value={el.selected}
              checked={el.selected}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
export default AcceptedInvitations;
