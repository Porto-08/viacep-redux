import { render, screen, useEvent, fireEvent } from "../../test";
import App from "../../App.jsx";

describe("Viacep", () => {

  it("get input data", () => {
    const handleChange = jest.fn();
    const { container } = render(<App />);

    const input = container.querySelector("input");

    fireEvent.change(input, { target: { value: "02976230" } });

    expect(input.value).toBe("02976230");
  });

  it("cep error message not found", async () => {
    const { container } = render(<App />);

    const input = screen.getByLabelText("Infome um CEP para consulta");
    
    fireEvent.change(input, { target: { value: "54545454" } });
    expect(input.value).toBe("54545454");

    container.querySelector("button").click();

    const findText = await screen.findByText("Cep não encontrado.");
    expect(findText).toBeInTheDocument();
  });

  it("cep error message invalid", async () => {
    const { container } = render(<App />);

    const input = screen.getByLabelText("Infome um CEP para consulta");
    
    fireEvent.change(input, { target: { value: "" } });
    expect(input.value).toBe("");

    container.querySelector("button").click();

    const findText = await screen.findByText("CEP inválido, preencha corretamente.");
    expect(findText).toBeInTheDocument();
  });

  it("cep error message invalid", async () => {
    const { container } = render(<App />);

    const input = screen.getByLabelText("Infome um CEP para consulta");
    
    fireEvent.change(input, { target: { value: "5465651651616515" } });
    expect(input.value).toBe("5465651651616515");

    container.querySelector("button").click();

    const findText = await screen.findByText("CEP inválido, preencha corretamente.");
    expect(findText).toBeInTheDocument();
  });


  it("verify request", async () => {
    const { container } = render(<App />);

    const input = container.querySelector("input");
    fireEvent.change(input, { target: { value: "02976230" } });

    expect(input.value).toBe("02976230");

    container.querySelector("button").click();

    const findText = await screen.findByText("Cep: 02976-230");

    expect(findText).toBeInTheDocument();
  });
});
