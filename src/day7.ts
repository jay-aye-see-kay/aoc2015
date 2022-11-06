/** 
This year, Santa brought little Bobby Tables a set of wires and bitwise logic
gates! Unfortunately, little Bobby is a little under the recommended age range,
and he needs help assembling the circuit.

Each wire has an identifier (some lowercase letters) and can carry a 16-bit
signal (a number from 0 to 65535). A signal is provided to each wire by a gate,
another wire, or some specific value. Each wire can only get a signal from one
source, but can provide its signal to multiple destinations. A gate provides no
signal until all of its inputs have a signal.

The included instructions booklet describes how to connect the parts together:
x AND y -> z means to connect wires x and y to an AND gate, and then connect
its output to wire z.

For example:

- 123 -> x means that the signal 123 is provided to wire x.
- x AND y -> z means that the bitwise AND of wire x and wire y is provided to
  wire z.
- p LSHIFT 2 -> q means that the value from wire p is left-shifted by 2 and
  then provided to wire q.
- NOT e -> f means that the bitwise complement of the value from wire e is
  provided to wire f.

Other possible gates include OR (bitwise OR) and RSHIFT (right-shift). If, for
some reason, you'd like to emulate the circuit instead, almost all programming
languages (for example, C, JavaScript, or Python) provide operators for these
gates.

For example, here is a simple circuit:

123 -> x
456 -> y
x AND y -> d
x OR y -> e
x LSHIFT 2 -> f
y RSHIFT 2 -> g
NOT x -> h
NOT y -> i

After it is run, these are the signals on the wires:

d: 72
e: 507
f: 492
g: 114
h: 65412
i: 65079
x: 123
y: 456

In little Bobby's kit's instructions booklet (provided as your puzzle input),
what signal is ultimately provided to wire a?
*/
export function part1(input: string) {
  const wires = Object.fromEntries(
    parse(input).map((wire) => [wire.output, wire])
  );
  return runSimulation(wires);
}

/**
--- Part Two ---

Now, take the signal you got on wire a, override wire b to that signal, and
reset the other wires (including wire a). What new signal is ultimately
provided to wire a?
*/
export function part2(input: string) {
  const wires = Object.fromEntries(
    parse(input).map((wire) => [wire.output, wire])
  );
  const part1Answer = runSimulation(wires).a;

  const part2Wires = Object.fromEntries(
    parse(input).map((wire) => [wire.output, wire])
  );
  part2Wires.b = { type: "eq", output: "b", lhs: part1Answer };
  return runSimulation(part2Wires);
}

// ---

type Value = string | number;
type Expr =
  | { type: "eq"; lhs: Value; output: string }
  | { type: "unary"; op: "not"; lhs: Value; output: string }
  | {
      type: "binary";
      op: "AND" | "OR" | "LSHIFT" | "RSHIFT";
      lhs: Value;
      rhs: Value;
      output: string;
    };

function parse(input: string) {
  return input
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => !!line)
    .map((line): Expr => {
      const [lhsString, output] = line.split(" -> ");
      const lhsElements = lhsString.split(" ");
      const strOrNum = (s: string) =>
        Number.isNaN(parseInt(s)) ? s : parseInt(s);

      if (lhsElements.length === 1) {
        return { type: "eq", lhs: strOrNum(lhsElements[0]), output };
      } else if (lhsElements.length === 2) {
        return {
          type: "unary",
          op: "not",
          lhs: strOrNum(lhsElements[1]),
          output,
        };
      } else if (lhsElements.length === 3) {
        return {
          type: "binary",
          op: lhsElements[1] as "AND" | "OR" | "LSHIFT" | "RSHIFT",
          lhs: strOrNum(lhsElements[0]),
          rhs: strOrNum(lhsElements[2]),
          output,
        };
      } else {
        throw new Error(`unexpected lhsString ${lhsString}`);
      }
    });
}

function uint16(n: number) {
  return n & 0xffff;
}

function runSimulation(wires: Record<string, Expr>) {
  let hasMore = true;
  while (hasMore) {
    hasMore = false;

    for (const wireName in wires) {
      const wire = wires[wireName];

      let resolvedLhs: number | undefined;
      const derefLhs = wires[wire.lhs];
      if (typeof wire.lhs === "number") {
        resolvedLhs = wire.lhs;
      } else if (derefLhs.type === "eq" && typeof derefLhs.lhs === "number") {
        resolvedLhs = derefLhs.lhs;
      }

      let resolvedRhs: number | undefined;
      if ("rhs" in wire) {
        const derefRhs = wires[wire.rhs];
        if (typeof wire.rhs === "number") {
          resolvedRhs = wire.rhs;
        } else if (derefRhs.type === "eq" && typeof derefRhs.lhs === "number") {
          resolvedRhs = derefRhs.lhs;
        }
      }

      if (wire.type === "eq" && resolvedLhs !== undefined) {
        if (typeof wire.lhs === "string") {
          wires[wire.output] = {
            type: "eq",
            lhs: resolvedLhs,
            output: wire.output,
          };
        }
      } else if (wire.type === "unary" && resolvedLhs !== undefined) {
        wires[wire.output] = {
          type: "eq",
          lhs: uint16(~resolvedLhs),
          output: wire.output,
        };
      } else if (
        wire.type === "binary" &&
        resolvedLhs !== undefined &&
        resolvedRhs !== undefined
      ) {
        const newLhs = (() => {
          switch (wire.op) {
            case "AND":
              return resolvedLhs & resolvedRhs;
            case "OR":
              return resolvedLhs | resolvedRhs;
            case "LSHIFT":
              return resolvedLhs << resolvedRhs;
            case "RSHIFT":
              return resolvedLhs >> resolvedRhs;
          }
        })();
        wires[wire.output] = {
          type: "eq",
          lhs: newLhs,
          output: wire.output,
        };
      } else {
        hasMore = true;
      }
    }
  }

  return Object.fromEntries(
    Object.entries(wires).map(([outName, wire]) => [outName, wire.lhs])
  );
}
