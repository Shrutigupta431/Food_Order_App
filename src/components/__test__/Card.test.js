import { render,screen } from "@testing-library/react"
import Card, { OpenedCard } from "../reusable/Card"
import MOCK_DATA from "../mock/resCardMock.json"

test("should Render Card Component  with props data",()=>{
    render(<Card  restaurant={MOCK_DATA} />);

    const Resname = screen.getByText("Ravi Alpahar");

    expect(Resname).toBeInTheDocument();
});

test("should Render Card Component  with Opended Label",()=>{
    const WrappedCard = OpenedCard(Card);

    // Render the WrappedCard with restaurant data
    render(<WrappedCard restaurant={MOCK_DATA} />);

    // Check if the "Opened" label is rendered
    expect(screen.getByText('Opened')).toBeInTheDocument();
})