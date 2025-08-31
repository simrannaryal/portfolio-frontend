import pandas as pd
import matplotlib.pyplot as plt
import os

# Ensure output folder exists
os.makedirs("sample_output", exist_ok=True)

# Dummy tweets dataset
tweets = [
    {"username": "trader_01", "timestamp": "2025-08-30 09:15:00",
     "content": "Nifty50 opened strong, looking bullish today!", "likes": 12},
    {"username": "marketwatcher", "timestamp": "2025-08-30 09:45:00",
     "content": "Sensex weak, possible intraday correction.", "likes": 8},
    {"username": "equity_guru", "timestamp": "2025-08-30 10:10:00",
     "content": "BankNifty volatile, watch support levels.", "likes": 20}
]

df = pd.DataFrame(tweets)

# Save dataset to parquet
df.to_parquet("sample_output/tweets.parquet", engine="pyarrow", index=False)

print("✅ tweets.parquet created in sample_output/")

# Simple analysis: likes per user
likes_per_user = df.groupby("username")["likes"].sum()

# Create bar chart
plt.figure(figsize=(6, 4))
likes_per_user.plot(kind="bar", color="skyblue")
plt.title("Likes per User")
plt.ylabel("Total Likes")
plt.tight_layout()
plt.savefig("sample_output/analysis.png")

print("✅ analysis.png created in sample_output/")
